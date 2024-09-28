const Chat = require('../models/Chat');

class Chats {
  static async getAllChats() {
    const chats = await Chat.find();
    return chats;
  }

  static async getUserChat(advUser, currentUser) {
    const chat = await Chat.find({users: currentUser.toString() });
    if (chat.length > 0) {
      const messages = [];
      for (let i = 0; i < chat.length; i++) {
        messages.push(...chat[i].messages);
      }
      console.log(`msgs: ${messages}`);
      return messages;
    }
    return [];
  }
/*
  static async getUserChat(advUser, currentUser) { console.log(`advUser: ${advUser}`, `currentUser ${currentUser}`);
    const chat = await Chat.findOne({users: {$all: [advUser.toString(), currentUser.toString()] } });
    if (chat) {
      console.log(`chatMsgs: ${chat.messages}`);
      return chat.messages;
    }
    return [];
  }
*/

  static async getOneChat(owner, currentUser) {

  }

  static async addMessage (owner, currentUser, message) {
    const existChat = await Chat.findOne({users: [owner, currentUser]});
    if (existChat) {
      const updatedChat = await Chat.updateOne(
        {
          _id: existChat._id
        },
        {
          $push: {
            "messages": message
          }
        }
      );
      console.log(updatedChat);
    } else {
      await Chats.addChat(owner, currentUser, message);
    }
  }

  static async addChat(owner, currentUser, message) {
    const chat = new Chat();
    chat.users = [owner, currentUser];
    chat.createdAt = new Date();
    chat.messages = [message];
    const addedChat = await Chat.create(chat);
    console.log(addedChat);
  }
}

module.exports = Chats;