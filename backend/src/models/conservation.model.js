const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: String,
  from: String,
  body: String,
  type: String,
  timestamp: Date,
  status: String,
});

const conversationSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  messages: {
    type: [messageSchema],
    default: [],
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
