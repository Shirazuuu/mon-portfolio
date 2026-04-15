import { Resend } from "resend";

let lastRequestTime = 0; // ⭐ simple rate limit (serverless safe)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const now = Date.now();

    // ⭐ RATE LIMIT (1 request / 5 sec)
    if (now - lastRequestTime < 5000) {
      return res.status(429).json({ error: "Too many requests" });
    }
    lastRequestTime = now;

    const { name, email, subject, message, website } = req.body;

    // ⭐ HONEYPOT CHECK
    if (website) {
      return res.status(400).json({ error: "Bot detected" });
    }

    // ⭐ VALIDATION
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: "tommymaheriniaina@gmail.com",
      subject: `📩 ${subject}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial; line-height:1.6;">
          <h2>📬 Nouveau message portfolio</h2>

          <p><b>Nom :</b> ${name}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Sujet :</b> ${subject}</p>

          <hr/>

          <p>${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}