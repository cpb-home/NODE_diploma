const roomName = location.pathname.split('/').pop();
const socket = io.connect('/', {query: `roomName=${roomName}`});
let currentUserName;
let messages;

socket.on('connect', () => {
  console.log('connect');
});
socket.on('updatePos', function(data) {
  console.log(data);
  currentUserName = data.currentUserName;
});

const list = document.querySelector('.chatCont');
const inputUsername = /*document.querySelector('.usernameInp');*/ 'a';
console.log(`roomname: ${roomName}`); 
const inputText     = document.querySelector('.usernameInp');
//const sendAll       = document.querySelector('#send-all');
//const sendMe        = document.querySelector('#send-me');
const sendRoom      = document.querySelector('.msgSendBtn');

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
  list.insertAdjacentHTML('afterbegin', div);
  list.scrollTop = 0;
});

if (sendRoom) {
  sendRoom.addEventListener('click', () => {
    socket.emit('message-to-room', {
        username: currentUserName,
        text: inputText.value,
    })
  })
}