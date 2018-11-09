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

  handleActions = action => {
    switch (action.type) {
      case 'OPEN_MODAL': {
        this.open = true;
        this.emit('open-' + action.id);
        break;
      }
      case 'CLOSE_MODAL': {
        this.close = true;
        console.log('emit close');
        this.emit('close');
        break;
      }
    }
  };
}

const modalStore = new ModalStore();
dispatcher.register(modalStore.handleActions.bind(modalStore));

export default modalStore;
