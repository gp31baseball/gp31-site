console.log("🔥 GP31 Text API loaded");




import twilio from "twilio";

export default async function handler(req, res) {
  // Restrict to POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("📨 /api/text route hit");

  const { name, phone, age, position, message } = req.body;

  // Verify required environment variables exist
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !MY_PHONE_NUMBER) {
    console.error("❌ Missing Twilio environment variables.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  // Initialize Twilio client
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    const smsBody = [
      "📋 New GP31 Tryout Submission:",
      `Name: ${name || "N/A"}`,
      `Age: ${age || "N/A"}`,
      `Position: ${position || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Message: ${message || "N/A"}`,
    ].join("\n");

    const result = await client.messages.create({
      body: smsBody,
      from: TWILIO_PHONE_NUMBER,
      to: MY_PHONE_NUMBER,
    });

    console.log("✅ Text sent successfully! SID:", result.sid);
    res.status(200).json({ message: "Text sent successfully" });
  } catch (err) {
    console.error("❌ SMS send error:", err?.message || err);
    res.status(500).json({ message: "Text failed to send" });
  }
}

