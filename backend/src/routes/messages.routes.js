const express = require("express");
const router = express.Router();
const Conversation = require("../models/conservation.model");

// ✅ GET all chats
router.get("/chats", async (req, res) => {
  try {
    const chats = await Conversation.find({}, { messages: 0 }) // exclude messages for list
      .sort({ "messages.timestamp": -1 });
    res.json({ success: true, data: chats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ GET messages for specific chat by wa_id
router.get("/:wa_id", async (req, res) => {
  try {
    const chat = await Conversation.findOne({ wa_id: req.params.wa_id });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }
    res.json({ success: true, data: chat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ POST new message
router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.contacts || !payload.messages) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payload" });
    }

    const contact = payload.contacts[0];
    const message = payload.messages[0];
    const wa_id = contact.wa_id;
    const name = contact.profile?.name || "Unknown";

    const newMessage = {
      id: message.id,
      from: message.from,
      body: message.text?.body || "",
      type: message.type,
      timestamp: new Date(parseInt(message.timestamp) * 1000),
      status: "sent",
    };

    let conversation = await Conversation.findOne({ wa_id });
    if (!conversation) {
      conversation = new Conversation({ wa_id, name, messages: [newMessage] });
    } else {
      conversation.messages.push(newMessage);
    }

    await conversation.save();
    res.status(201).json({ success: true, data: conversation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
