import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email from:", email);

    // Send email to you (the owner)
    const ownerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HAIRSCOPAi Contact <onboarding@resend.dev>",
        to: ["aryansingh981860@gmail.com"],
        subject: `[HAIRSCOPAi Contact] ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">
            This message was sent via the HAIRSCOPAi contact form.
          </p>
        `,
      }),
    });

    if (!ownerEmailRes.ok) {
      const errorData = await ownerEmailRes.text();
      console.error("Failed to send owner email:", errorData);
      throw new Error("Failed to send email to owner");
    }

    console.log("Owner email sent successfully");

    // Send confirmation email to the user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HAIRSCOPAi <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message - HAIRSCOPAi",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #10b981;">Thank you for contacting HAIRSCOPAi!</h1>
            <p>Hi ${name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Your message:</strong></p>
              <p style="color: #666;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br>The HAIRSCOPAi Team</p>
          </div>
        `,
      }),
    });

    if (!userEmailRes.ok) {
      console.error("Failed to send user confirmation email");
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
