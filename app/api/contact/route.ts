import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const getClientId = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
};

const validate = (payload: { name?: string; email?: string; message?: string; company?: string }) => {
  if (payload.company) return "Spam detected.";
  if (!payload.name || payload.name.trim().length < 2) return "Name is required.";
  if (!payload.email || !/\S+@\S+\.\S+/.test(payload.email)) return "Valid email required.";
  if (!payload.message || payload.message.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
};

export async function POST(req: NextRequest) {
  const clientId = getClientId(req);
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (entry && now - entry.timestamp < WINDOW_MS) {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    entry.count += 1;
  } else {
    rateLimitStore.set(clientId, { count: 1, timestamp: now });
  }

  const payload = await req.json();
  const error = validate(payload);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ message: "Email configuration missing." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    subject: `Portfolio inquiry from ${payload.name}`,
    replyTo: payload.email,
    text: `${payload.name} (${payload.email})\n\n${payload.message}`,
  });

  // TODO: Replace in-memory rate limiter with durable storage for serverless deployments.

  return NextResponse.json({ message: "Message sent." });
}
