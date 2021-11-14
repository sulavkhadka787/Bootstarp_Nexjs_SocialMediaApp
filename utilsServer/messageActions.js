const ChatModel = require("../models/ChatModel");

const loadMessages = async (userId, messagesWith) => {
  console.log("message-actions-loadmessages");
  try {
    const user = await ChatModel.findOne({ user: userId }).populate(
      "chats.messagesWith"
    );

    const chat = user.chats.find(
      (chat) => chat.messagesWith._id.toString() === messagesWith
    );

    if (!chat) {
      return { error: "No Chat Found" };
    }

    return { chat };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { loadMessages };
