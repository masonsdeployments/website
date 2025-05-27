import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const data = await resend.emails.send({
      from: "Masons <contact@wearemasons.com>",
      to: ["wearemasons@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ""}
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // You might want to log the data from Resend for debugging purposes
    // console.log("Resend email data:", data);

    return NextResponse.json({ success: true, data }); // Include data in response for more info
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." }, // More user-friendly message
      { status: 500 },
    );
  }
}
