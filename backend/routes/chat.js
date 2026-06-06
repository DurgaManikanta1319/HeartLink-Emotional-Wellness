const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { messages = [], selectedEmotion } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ message: "OPENROUTER_API_KEY is not configured on backend" });
    }

    const systemPrompt =
      "You are HeartLink AI Coach. Give supportive, practical, emotionally safe guidance. Keep replies short (2-5 sentences), warm, and non-judgmental. Do not claim to be a therapist. If user may be in danger, encourage contacting local emergency services.";

    const conversation = messages
      .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
      .slice(-20)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    if (conversation.length === 0) {
      return res.status(400).json({ message: "No valid chat messages were provided" });
    }

    const payload = {
      model: process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\nSelected emotion: ${selectedEmotion || "not selected"}`,
        },
        ...conversation,
      ],
    };

    const requestHeaders = {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
      "X-Title": process.env.OPENROUTER_APP_NAME || "HeartLink",
    };

    const callOpenRouter = async (model) => {
      const requestPayload = { ...payload, model };
      return fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestPayload),
      });
    };

    let aiResponse = await callOpenRouter(payload.model);
    let responseBodyText = await aiResponse.text();

    if (!aiResponse.ok && responseBodyText.includes("No endpoints found") && payload.model !== "openrouter/free") {
      aiResponse = await callOpenRouter("openrouter/free");
      responseBodyText = await aiResponse.text();
    }

    if (!aiResponse.ok) {
      const errorText = responseBodyText;
      console.error("OpenRouter error:", errorText);
      let reason = "OpenRouter request failed";

      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.error?.message) {
          reason = parsed.error.message;
        }
      } catch (_parseError) {
        reason = errorText || reason;
      }

      return res.status(502).json({ message: reason, details: errorText });
    }

    const data = JSON.parse(responseBodyText);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ message: "OpenRouter returned an empty response" });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error.message);
    return res.status(500).json({ message: "Server error while generating AI response" });
  }
});

module.exports = router;
