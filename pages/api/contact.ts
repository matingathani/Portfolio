import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message, company, website, honeypot } = req.body || {};

  if (honeypot) {
    return res.status(200).json({ message: "Spam detected" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `Portfolio Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || ""}\nWebsite: ${website || ""}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    return res.status(500).json({ message: "Email failed to send" });
  }
};

export default handler;
