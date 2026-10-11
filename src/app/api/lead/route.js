import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Receives the lead form.
// 1. Saves every lead as a private JSON file in Vercel Blob (leads/…) when a Blob store is connected
//    (Vercel adds BLOB_READ_WRITE_TOKEN automatically). View them in Vercel → Storage → the store → Browser.
// 2. Also forwards to LEAD_WEBHOOK_URL (Zapier/Make/Formspree/CRM) when set.
// 3. Always writes to the server log as a last resort, so nothing is silently lost.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (body.website) return NextResponse.json({ ok: true });

  const clean = (v, n = 500) => String(v ?? "").trim().slice(0, n);
  const lead = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    type: clean(body.type, 60),
    budget: clean(body.budget, 30),
    details: clean(body.details, 4000),
    source: "specimen",
    receivedAt: new Date().toISOString(),
  };

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email);
  const phoneOk = lead.phone.replace(/\D/g, "").length >= 7;
  if (lead.name.length < 2 || (!emailOk && !phoneOk)) {
    return NextResponse.json({ ok: false, error: "Name and an email or phone are required." }, { status: 422 });
  }

  let saved = false;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const id = `${lead.receivedAt.replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
      await put(`leads/${id}.json`, JSON.stringify(lead, null, 2), { access: "private", contentType: "application/json", addRandomSuffix: false });
      saved = true;
    } catch (e) {
      console.error("[lead] blob save failed", e);
    }
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
    } catch (e) {
      console.error("[lead] webhook failed", e, JSON.stringify(lead));
      if (!saved) return NextResponse.json({ ok: false, error: "Could not deliver lead." }, { status: 502 });
    }
  }
  console.log(`[lead] received (blob: ${saved ? "saved" : "not configured"}, webhook: ${hook ? "on" : "off"})`, JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
