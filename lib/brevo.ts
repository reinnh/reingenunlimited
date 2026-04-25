export async function sendEmail({
  toEmail,
  toName,
  subject,
  htmlContent,
}: {
  toEmail: string;
  toName: string;
  subject: string;
  htmlContent: string;
}) {
  const BREVO_API_KEY = process.env.NEXT_BREVO_API_KEY;
  const EMAIL_USER = process.env.EMAIL_USER;

  if (!BREVO_API_KEY || !EMAIL_USER) {
    console.error("Missing Brevo credentials");
    return false;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Reingen",
          email: EMAIL_USER,
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export function getAutoReplyHtml(name: string) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .header { padding-bottom: 30px; border-bottom: 1px solid #eaeaea; text-align: center; }
      .logo { font-size: 24px; font-weight: 800; color: #0b0b18; letter-spacing: 2px; text-transform: uppercase; }
      .content { padding: 40px 0; }
      .title { font-size: 22px; font-weight: 600; margin-bottom: 20px; color: #0b0b18; }
      p { margin-bottom: 15px; color: #4a4a5a; }
      .timeline { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #38BDF8; }
      .footer { padding-top: 30px; border-top: 1px solid #eaeaea; text-align: center; font-size: 12px; color: #888; }
      .signature { font-weight: 600; color: #0b0b18; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">Reingen</div>
      </div>
      
      <div class="content">
        <div class="title">We've received your inquiry</div>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for reaching out to Reingen. We have received your message and our engineering team is currently reviewing your request.</p>
        
        <p>At Reingen, we specialize in building scalable platforms, high-performance web systems, and modern digital infrastructure. We understand that every project is unique, and we take the time to deeply understand your technical and business requirements before proposing a solution.</p>
        
        <div class="timeline">
          <p style="margin-top:0; font-weight: 600; color: #0b0b18;">What happens next?</p>
          <ul style="color: #4a4a5a; padding-left: 20px;">
            <li><strong>Review (24 hours):</strong> A senior engineer will review your inquiry to assess technical feasibility and alignment.</li>
            <li><strong>Discovery Call:</strong> We will reach out to schedule a brief discovery call to discuss your goals, timeline, and budget.</li>
            <li><strong>Proposal:</strong> Following our discussion, we will prepare a comprehensive technical proposal and implementation strategy.</li>
          </ul>
        </div>
        
        <p>If you have any urgent details or additional documentation you'd like to share in the meantime, please feel free to reply directly to this email.</p>
        
        <div class="signature">
          Best regards,<br>
          The Reingen Engineering Team<br>
          <a href="https://reingen.xyz" style="color: #38BDF8; text-decoration: none;">reingen.xyz</a>
        </div>
      </div>
      
      <div class="footer">
        &copy; ${new Date().getFullYear()} Reingen Limited. All rights reserved.<br>
        This is an automated acknowledgment. You can reply directly to this email to reach our team.
      </div>
    </div>
  </body>
  </html>
  `;
}
