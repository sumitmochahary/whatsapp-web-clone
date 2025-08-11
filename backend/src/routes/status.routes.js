const express = require("express");
const router = express.Router();
const Conversation = require("../models/conservation.model");

// ✅ Update message status
router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.statuses) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payload" });
    }

    const statusObj = payload.statuses[0];
    const messageId = statusObj.id || statusObj.meta_msg_id;
    if (!messageId) {
      return res
        .status(400)
        .json({ success: false, message: "No message ID provided" });
    }

    const result = await Conversation.updateOne(
      { "messages.id": messageId },
      { $set: { "messages.$.status": statusObj.status } }
    );

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
