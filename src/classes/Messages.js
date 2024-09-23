const Message = require('../models/Message');

class Messages {
  static async getAllMessages() {
    const messages = await Message.find();
    return messages;
  }

  static async getOneMessage() {

  }

  static async addMessage(author, text) {
    const mess = new Message();
    mess.author = author;
    mess.sentAt = new Date();
    mess.text = text;
    mess.readAt = new Date();
    const addedMessage = await Message.create(mess);
    console.log(addedMessage);
  }
}

module.exports = Messages;