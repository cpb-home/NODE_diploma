const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Messages = require('../classes/Messages');

const socketFunc = async (socket) => {
  const userId = socket.request.user.id;
  const user = socket.request.user;
  const chats = await Chat.find({users: socket.request.user.id});
  const messages = [];
  /*for (let msg of chats) {
    const currentMsg = await Message.findOne({id: msg});
    console.log(currentMsg.id);
  }*/
  //await getMessage(chats);
  /*chats.forEach(chat => {
    chat.messages.forEach(msg => getMessage(msg))
  })*/
  
  socket.emit('updatePos', {currentUserName: user.name, messages: chats});

  const { roomName } = socket.handshake.query;
  //socket.join(`user:${userId}`);
  //console.log('user: ' + user);
  //console.log('roomName: ' + roomName);
  socket.join(roomName);

  socket.on('message-to-me', (msg) => {
    msg.type = 'me';
    socket.emit('message-to-me', msg);
  })

  socket.on('message-to-room', (msg) => {
    Messages.addMessage(userId, msg.text);
    msg.type = `roomName: ${roomName}`;
    socket.to(roomName).emit('message-to-room', msg);
    socket.emit('message-to-room', msg);
  })
}

// СООБЩЕНИЯ ВЫВОДЯТСЯ ИЗ СПИСКА СООБЩЕНИЙ. ВЫВОДЯТСЯ ВСЕ.
// А НАДО ПОЛУЧАТЬ СООБЩЕНИЯ ИЗ ЧАТА, ГДЕ ЕСТЬ ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ, И ПОТОМ ВЫВОДИТЬ НУЖНЫЕ ПО ИД

// ТАКЖЕ НАДО СООБЩЕНИЯ ПРИ ДОБАВЛЕНИИ ЗАПИХИВАТЬ В ЧАТ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ И АВТОРА

module.exports = socketFunc;