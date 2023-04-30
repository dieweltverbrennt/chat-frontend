import Modal from './Modal';
import ChatController from './ChatController';

const modal = new Modal();
const chatController = new ChatController(modal);

chatController.init();
