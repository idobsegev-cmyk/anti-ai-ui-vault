import { NextResponse } from "next/server";

// Receives the lead form. Forwards to LEAD_WEBHOOK_URL (Zapier/Make/Slack/Formspree/your CRM) when set.
// Without a webhook the lead is written to the server log so nothing is silently lost during setup.
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

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
    } catch (e) {
      console.error("[lead] webhook failed", e, lead);
      return NextResponse.json({ ok: false, error: "Could not deliver lead." }, { status: 502 });
    }
  } else {
    console.log("[lead] (no LEAD_WEBHOOK_URL set)", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
