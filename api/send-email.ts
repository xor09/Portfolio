import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message, botField, turnstileToken } = req.body || {};
    // console.log(req.body);

    // Honeypot: if filled => bot
    if (botField) {
      return res.status(400).json({ error: 'Spam detected' });
    }

    if (!name || !email || !subject || !message) {
      res.statusCode = 400;
      return res.json({ message: "Missing fields" });
    }

    // ✅ Verify Turnstile token with Cloudflare
    try {
      const params = new URLSearchParams();
      params.append('secret', process.env.TURNSTILE_SECRET_KEY || '');
      params.append('response', turnstileToken || '');

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: params,
      });

      const data = await verifyRes.json();
      if (!data.success) {
        return res.status(400).json({ error: 'Bot verification failed' });
      }
    } catch (err) {
      console.error('Turnstile verify error:', err);
      return res.status(500).json({ error: 'Verification failed' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,         
      subject: `Portfolio: ${subject} (from ${name})`,
      replyTo: email,
      text: `
From: ${name} <${email}>

Subject:
${subject}

Message:
${message}
      `,
    });

    return res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.statusCode = 500;
    return res.json({ message: "Failed to send email" });
  }
}
