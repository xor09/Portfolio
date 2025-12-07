import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      res.statusCode = 400;
      return res.json({ message: "Missing fields" });
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
