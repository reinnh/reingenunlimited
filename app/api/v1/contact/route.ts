import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contact from "./core/model";
import { sendEmail, getAutoReplyHtml } from "@/lib/brevo";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, message" },
        { status: 400 }
      );
    }

    // 1. Connect to Database
    await dbConnect();

    // 2. Save Contact to DB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // 3. Send Auto-Reply Email asynchronously (don't block response)
    const emailSubject = "Thank you for reaching out to Reingen";
    const emailHtml = getAutoReplyHtml(name);
    
    sendEmail({
      toEmail: email,
      toName: name,
      subject: emailSubject,
      htmlContent: emailHtml,
    }).catch(console.error);

    // 4. Send WhatsApp Notification asynchronously
    sendWhatsAppNotification({
      name,
      email,
      phone,
      message,
    }).catch(console.error);

    return NextResponse.json(
      { success: true, message: "Contact request submitted successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
