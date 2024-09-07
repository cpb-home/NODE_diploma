const roomName = location.pathname.split('/').pop();
const socket = io.connect('/', {query: `roomName=${roomName}`});

const list = document.querySelector('.chatCont');
const inputUsername = document.querySelector('.usernameInp');
const inputText     = document.querySelector('.msgInp');
//const sendAll       = document.querySelector('#send-all');
//const sendMe        = document.querySelector('#send-me');
const sendRoom      = document.querySelector('.msgSendBtn');

console.log(socket.request);

const getTmp = (msg) => {
  return `
          <div class="msgCont">
              <div class="msgText">
                  ${msg.text}
              </div>
              <div class="msgAuth">
                ${msg.username}
              </div>
          </div>
  `;
};

socket.on('message-to-room', (msg) => {
  const div = getTmp(msg)
  list.insertAdjacentHTML('afterbegin', div)
});

if (sendRoom) {
  sendRoom.addEventListener('click', () => {//console.log(session.user)
    socket.emit('message-to-room', {
        username: inputUsername.value,
        text: inputText.value,
    })
  })
}