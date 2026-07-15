import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/data/site";

/**
 * Contact form API — Resend backend.
 * Set RESEND_API_KEY in .env.local
 * Fallback: logs payload when key is missing (dev-friendly).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (
      !name ||
      !email ||
      !subject ||
      !message ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.info("[contact] RESEND_API_KEY missing — payload:", {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json({
        ok: true,
        mode: "dev-fallback",
        message: "Logged locally. Configure RESEND_API_KEY for email delivery.",
      });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: SITE.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
