export async function sendWhatsAppNotification({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    const text = `New Project Inquiry from Reingen.xyz\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage snippet:\n"${
      message.length > 100 ? message.substring(0, 100) + "..." : message
    }"\n\nPlease log into the admin panel to view the full details.`;

    const response = await fetch("https://jarvis-1-8io6.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+254794809143",
        text: text,
      }),
    });

    if (!response.ok) {
      console.error("WhatsApp API Error:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return false;
  }
}
