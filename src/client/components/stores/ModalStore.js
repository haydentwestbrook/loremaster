import { EventEmitter } from 'events';
import { dispatcher } from './actions';

class ModalStore extends EventEmitter {
  constructor() {
    super();
    this.open = false;
  }

  getState() {
    return this.open;
  }

  isOpen(id) {
    return this.open && this.id == id;
  }

  openModal(action) {
    this.open = true;
    document.body.style.overflow = 'hidden';
    this.emit('open-' + action.id);
  }

  closeModal() {
    this.open = false;
    document.body.style.overflow = 'auto';
    this.emit('close');
  }

  handleActions = action => {
    switch (action.type) {
      case 'OPEN_MODAL': {
        this.openModal(action);
        break;
      }
      case 'CLOSE_MODAL': {
        this.closeModal();
        break;
      }
    }
  };
}

const modalStore = new ModalStore();
dispatcher.register(modalStore.handleActions.bind(modalStore));

export default modalStore;
