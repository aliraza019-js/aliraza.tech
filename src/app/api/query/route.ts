import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "alir033397@gmail.com";
// TODO: Once aliraza.tech is verified on Resend, change TO back to "contact@aliraza.tech"

/* ── Rate limiter ── */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, { count: number; firstHit: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.firstHit > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, firstHit: now });
    return false;
  }
  entry.count++;
  return entry.count > RATE_MAX;
}

interface QueryBody {
  email: string;
  _hp?: string;
  _t?: number;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body: QueryBody = await req.json();

    if (body._hp) return NextResponse.json({ success: true });
    if (body._t && Date.now() - body._t < 3_000)
      return NextResponse.json({ success: true });

    const email = body.email?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const { error: sendError } = await resend.emails.send({
      from: "Ali Raza Portfolio <onboarding@resend.dev>",
      to: TO,
      replyTo: email,
      subject: "[Portfolio] New Query Request",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #C9F31C 0%, #8FA800 100%); padding: 24px 32px;">
            <h1 style="margin: 0; color: #1a1a1a; font-size: 20px; font-weight: 800;">New Query Request</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
            <p style="margin: 0; font-size: 16px;">
              <a href="mailto:${escapeHtml(email)}" style="color: #C9F31C; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a>
            </p>
            <p style="margin: 24px 0 0; color: #555; font-size: 13px; line-height: 1.6;">
              Someone submitted their email via the footer query form on your portfolio. Hit reply to respond directly.
            </p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend query error:", JSON.stringify(sendError));
      const detail =
        process.env.NODE_ENV === "development" ? ` (${sendError.message})` : "";
      return NextResponse.json(
        { error: `Failed to send. Please try again.${detail}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
