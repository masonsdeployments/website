import { NextResponse } from "next/server";
import sendEmail from "@/smtp/sendingEmails";
export async function POST(req: Request) {

  const { name, email, company, projectType, message } = await req.json();
  const text = `
  Name: ${name}
  Email: ${email}
  Company: ${company}
  Project Type: ${projectType}
  Message: ${message}
  `;
  console.log(text);
  try {
    await sendEmail(text);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}
