import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    // ⭐ validation propre
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // obligé
      to: "tommymaheriniaina@gmail.com",
      subject: `📩 ${subject}`,
      reply_to: email, // ⭐ IMPORTANT : réponse utilisateur
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2>📬 Nouveau message depuis ton portfolio</h2>

          <p><b>Nom :</b> ${name}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Sujet :</b> ${subject}</p>

          <hr/>

          <p><b>Message :</b></p>
          <p>${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}