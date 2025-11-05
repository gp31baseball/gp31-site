import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, age, position, message } = req.body;
  const dir = path.join(process.cwd(), "data", "submissions");

  // Ensure folder exists
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Create a timestamped filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dir, `submission-${timestamp}.json`);

  const data = {
    name,
    email,
    phone,
    age,
    position,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("✅ Submission saved:", filePath);
    res.status(200).json({ message: "Submission saved locally" });
  } catch (err) {
    console.error("❌ Failed to save submission:", err);
    res.status(500).json({ message: "Failed to save submission" });
  }
}

