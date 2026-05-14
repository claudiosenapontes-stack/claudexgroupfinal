import { NextResponse } from "next/server";

// Destination is server-only — never reaches the browser.
// Set CONTACT_EMAIL in Vercel env vars to override.
const DEST = process.env.CONTACT_EMAIL || "claudio.senapontes@gmail.com";

export async function POST(req: Request) {
  let body: { name?: string; company?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing-required" }, { status: 400 });
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DEST)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      company: (body.company || "").trim(),
      email,
      message: (body.message || "").trim(),
      _subject: `X Group — new sourcing request from ${name}`,
      _template: "box",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
