import kv from "@/lib/kv";

export default async function handler(req, res) {
  try {
    // Write a test value
    await kv.set("gp31:test", { status: "connected", time: new Date().toISOString() });

    // Read it back
    const check = await kv.get("gp31:test");

    return res.status(200).json({
      success: true,
      message: "✅ KV connection working!",
      data: check,
    });
  } catch (err) {
    console.error("❌ KV connection failed:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to connect to KV",
      error: err.message,
    });
  }
}
