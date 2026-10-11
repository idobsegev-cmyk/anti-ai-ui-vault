#!/usr/bin/env node
// Tell IndexNow search engines (Bing → DuckDuckGo, Yahoo, ChatGPT search; Yandex, Seznam, Naver)
// about every URL in the live sitemap. Google does not use IndexNow; it reads the sitemap in Search Console.
//
//   node scripts/indexnow.mjs            submit all sitemap URLs
//   INDEXNOW_DRY_RUN=1 node scripts/...  list what would be sent
//   INDEXNOW_WAIT_FOR=<sha>              wait until that commit is live first (used in CI)

const SITE = (process.env.SITE_URL || "https://specimen-designs.vercel.app").replace(/\/$/, "");
const KEY = "40d7133d555ff3a1c0eff47780e36c01"; // public/<KEY>.txt must contain exactly this string
const host = new URL(SITE).host;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitUntilLive() {
  // Wait for Vercel to finish deploying: the key file and the sitemap must both answer 200.
  for (let i = 0; i < 40; i++) {
    try {
      const [k, s] = await Promise.all([fetch(`${SITE}/${KEY}.txt`), fetch(`${SITE}/sitemap.xml`)]);
      if (k.ok && s.ok && (await k.text()).trim() === KEY) return;
    } catch {}
    await sleep(15000);
  }
  throw new Error("Site or IndexNow key file not reachable after 10 minutes");
}

async function main() {
  if (process.env.INDEXNOW_WAIT_FOR) await sleep(150000); // give Vercel time to ship the new commit
  await waitUntilLive();
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))].filter((u) => new URL(u).host === host);
  if (!urls.length) throw new Error("Sitemap has no URLs for " + host);
  console.log(`[indexnow] ${urls.length} URLs from ${SITE}/sitemap.xml`);
  if (process.env.INDEXNOW_DRY_RUN) return console.log(urls.join("\n"));

  for (let i = 0; i < urls.length; i += 10000) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
    });
    console.log(`[indexnow] HTTP ${res.status} ${res.statusText}`);
    if (![200, 202].includes(res.status)) throw new Error(await res.text());
  }
}

main().catch((e) => {
  console.error("[indexnow]", e.message);
  process.exit(1);
});
