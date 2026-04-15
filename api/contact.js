import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "tommymaheriniaina@gmail.com",
      subject: subject,
      reply_to: email,
      html: `
        <h2>Nouveau message</h2>
        <p><b>Nom:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Sujet:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}