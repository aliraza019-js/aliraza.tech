import { NextResponse } from "next/server";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const TO = "alir033397@gmail.com";
const CC = "ali.septemsystem@gmail.com";
// TODO: Once aliraza.tech is verified on Resend, change TO back to "contact@aliraza.tech"
// and update `from` to "Ali Raza <contact@aliraza.tech>"

/* ── Rate limiter (in-memory, resets on cold start) ── */
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;
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

/* ── Minimum time (ms) a human needs to fill the form ── */
const MIN_FILL_MS = 3_000;

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  _hp?: string;
  _t?: number;
}

function validate(body: ContactBody): string | null {
  if (!body.name?.trim()) return "Name is required";
  if (!body.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "Invalid email";
  if (!body.subject?.trim()) return "Subject is required";
  if (!body.message?.trim()) return "Message is required";
  if (body.message.trim().length < 10) return "Message too short (min 10 chars)";
  return null;
}

function fakeSuccess() {
  return NextResponse.json({ success: true });
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

    const body: ContactBody = await req.json();

    // Honeypot: if the hidden field has a value, it's a bot  - return fake success
    if (body._hp) return fakeSuccess();

    // Timing: if submitted faster than a human can fill, it's a bot
    if (body._t && Date.now() - body._t < MIN_FILL_MS) return fakeSuccess();

    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { name, email, phone, subject, message } = body;

    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 },
      );
    }

    const { error: sendError } = await resend.emails.send({
      from: "Ali Raza Portfolio <onboarding@resend.dev>",
      to: TO,
      // cc: CC,  // Re-enable after domain verification
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #C9F31C 0%, #8FA800 100%); padding: 24px 32px;">
            <h1 style="margin: 0; color: #1a1a1a; font-size: 20px; font-weight: 800;">New Project Inquiry</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #888; font-size: 13px; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #fff; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #C9F31C; font-size: 14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #C9F31C; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #888; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #fff; font-size: 14px;">${escapeHtml(phone)}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #888; font-size: 13px;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #2a2a2a; color: #fff; font-size: 14px; font-weight: 600;">${escapeHtml(subject)}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: #111; border-radius: 12px; border: 1px solid #2a2a2a;">
              <p style="margin: 0 0 8px 0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #ddd; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            <p style="margin: 24px 0 0 0; color: #555; font-size: 11px;">You can reply directly to this email to respond to <strong style="color:#aaa;">${escapeHtml(name)}</strong>.</p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend error:", JSON.stringify(sendError));
      const detail =
        process.env.NODE_ENV === "development"
          ? ` (${sendError.message})`
          : "";
      return NextResponse.json(
        { error: `Failed to send email. Please try again.${detail}` },
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
