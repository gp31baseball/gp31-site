// pages/api/send-sms.js
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, age, position, message } = req.body;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const textBody = `
📩 GP31 Contact Form Submission
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Age: ${age || "N/A"}
Position: ${position || "N/A"}
Message: ${message}
    `;

    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: process.env.MY_PHONE_NUMBER,       // Your cell number
      body: textBody,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
}
