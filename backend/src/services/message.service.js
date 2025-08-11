const Conversation = require("../models/conservation.model");

async function insertMessage(payload) {
  if (!payload.contacts || !payload.messages) return;

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
    conversation = new Conversation({
      wa_id,
      name,
      messages: [newMessage],
    });
  } else {
    if (!Array.isArray(conversation.messages)) {
      conversation.messages = [];
    }
    conversation.messages.push(newMessage);
  }

  await conversation.save();
  return conversation;
}

async function updateStatus(payload) {
  if (!payload.statuses) return;

  const status = payload.statuses[0];
  const messageId = status.id || status.meta_msg_id;
  if (!messageId) return;

  await Conversation.updateOne(
    { "messages.id": messageId },
    { $set: { "messages.$.status": status.status } }
  );
}

module.exports = { insertMessage, updateStatus };
