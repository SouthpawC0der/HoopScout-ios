import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // If Resend API key is configured, send via email
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "support@hoopscoutapp.com";

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "HoopScout Contact <noreply@hoopscout.app>",
          to: [toEmail],
          reply_to: email,
          subject: `[HoopScout Contact] ${subject || "New message"}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "—"}</p>
            <hr />
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Log to console when no email provider is configured
      console.log("Contact form submission:", { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
