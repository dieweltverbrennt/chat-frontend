export default class Modal {
  constructor() {
    this.modal = null;
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
    <form>
      <h2>Выберите псевдоним</h2>
      <input type="text">
      <button>Продолжить</button>
    </form>`;
    document.body.appendChild(this.modal);
    this.modal.style.top = `${window.innerHeight / 2 - this.modal.offsetHeight / 2}px`;
    this.modal.style.left = `${window.innerWidth / 2 - this.modal.offsetWidth / 2}px`;
  }

  removeModal() {
    this.modal.remove();
    this.modal = null;
  }
}
