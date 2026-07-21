import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

type ContactRequest = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete every field." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (subject.length > 150) {
      return NextResponse.json(
        { error: "Subject must be 150 characters or fewer." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be 5,000 characters or fewer." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from: "GAHN AI Contact Form <contact@updates.gahnai.com>",
to: ["support@gahnai.com"],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0A1628;">
          <h1 style="font-size: 24px; margin-bottom: 24px;">
            New GAHN AI Contact Message
          </h1>

          <div style="background: #F7F8FA; border: 1px solid #E3E6EC; border-radius: 12px; padding: 24px;">
            <p style="margin: 0 0 14px;">
              <strong>Name:</strong> ${safeName}
            </p>

            <p style="margin: 0 0 14px;">
              <strong>Email:</strong> ${safeEmail}
            </p>

            <p style="margin: 0 0 20px;">
              <strong>Subject:</strong> ${safeSubject}
            </p>

            <div style="border-top: 1px solid #E3E6EC; padding-top: 20px;">
              <strong>Message:</strong>

              <p style="line-height: 1.7; margin-bottom: 0;">
                ${safeMessage}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Contact email failed:", error);

      return NextResponse.json(
        { error: "Your message could not be sent. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Your message was sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}