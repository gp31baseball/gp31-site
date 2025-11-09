// pages/api/contact.ts
import kv from "../../lib/kv"; // relative path, no alias

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const submission = {
    ...req.body,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Store the data in KV
    const id = `sub_${Date.now()}`;
    await kv.hset(id, submission);
    await kv.lpush("gp31_submissions", id);

    console.log("✅ Saved to KV:", id);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("❌ Failed to save submission:", err);
    return res.status(500).json({ message: "Failed to save submission" });
  }
}

