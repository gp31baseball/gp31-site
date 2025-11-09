// pages/api/contact.ts
import kv from "../../lib/kv";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const submission = {
    ...req.body,
    submittedAt: new Date().toISOString(),
  };

  try {
    // 1️⃣ Store the data in KV
    const id = `sub_${Date.now()}`;
    await kv.hset(id, submission);
    await kv.lpush("gp31_submissions", id);

    console.log("✅ Saved to KV:", id);

    // 2️⃣ Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NOTIFY_EMAIL,
        pass: process.env.NOTIFY_PASS,
      },
    });

    const mailOptions = {
      from: `"GP31 Baseball Site" <${process.env.NOTIFY_EMAIL}>`,
      to: "james.snell@darkvisiontech.com",
      subject: `📬 New GP31 Contact Form Submission from ${submission.name}`,
      text: `
New GP31 Baseball submission received!

Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone || "N/A"}
Age: ${submission.age || "N/A"}
Position: ${submission.position || "N/A"}

Message:
${submission.message}

Submitted at: ${submission.submittedAt}
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to james.snell@darkvisiontech.com");

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("❌ Failed to save submission or send email:", err);
    return res.status(500).json({ message: "Failed to process submission" });
  }
}
