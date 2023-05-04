export default class ChatController {
  constructor(modal) {
    this.modal = modal;
    this.chat = null;
    this.user = null;
  }

  init() {
    this.chat = document.querySelector('.chat');
    this.chat.classList.add('hidden');
    this.modal.createModal();

    this.chat = document.body.querySelector('.chat');

    const ws = new WebSocket('wss://chat-backend-0nti.onrender.com/wss');
    ws.addEventListener('open', () => {
      console.log('connected');
      });

    document.querySelector('.modal').querySelector('button').addEventListener('click', (e) => {
      e.preventDefault();
      const userValue = e.target.closest('form').querySelector('input').value.trim();
      ws.send(JSON.stringify({ type: 'addUser', data: userValue }));
      this.user = userValue;
    });

    ws.addEventListener('message', (evt) => {
      const response = JSON.parse(evt.data);
      if (response.type === 'addUser') {
        if (response.data === 'error') {
          alert('this nickname is already taken!');
        } else if (this.user !== response.data) {
          this.addUser(response.data);
        } else {
          this.modal.removeModal();
          this.chat.style.opacity = 1;
          this.addUser(response.data);
        }
      } else if (response.type === 'message') {
        this.createMessage(response.user, response.time, response.data);
      } else if (response.type === 'deleteUser') {
        this.deleteUser(response.data);
      }
    });

    ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    ws.addEventListener('error', () => {
      console.log('error');
    });

    const chatInput = this.chat.querySelector('input');

    chatInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        ws.send(JSON.stringify({ type: 'message', data: chatInput.value, user: this.user }));
        chatInput.value = '';
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addUser(user) {
    const users = document.body.querySelector('.chat__users').querySelector('ul');

    const userItem = document.createElement('li');
    userItem.dataset.name = user;

    if (user === this.user) {
      // eslint-disable-next-line no-param-reassign
      user = 'You';
    }
    userItem.innerHTML = `
    <div></div>
    <p>${user}</p>`;

    users.appendChild(userItem);
  }

  createMessage(user, time, msg) {
    const chatContainer = document.body.querySelector('.chat__container').querySelector('ul');

    const message = document.createElement('li');
    if (user === this.user) {
      // eslint-disable-next-line no-param-reassign
      user = 'You';
      message.classList.add('you');
    }
    message.innerHTML = `
    <div>${user}, ${time}</div>
    <p>${msg}</p>`;

    chatContainer.appendChild(message);
  }

  deleteUser(user) {
    const toDelete = this.chat.querySelector(`[data-name=${user}]`);
    toDelete.remove();
  }
}
