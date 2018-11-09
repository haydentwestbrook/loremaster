import React, { Component } from 'react';
import ModalStore from '../../stores/ModalStore';
import { modalActions } from '../../stores/actions';

class Modal extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = {
      open: ModalStore.isOpen(id)
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    ModalStore.on('open-' + id, () => {
      this.setState({ open: true });
    });
    ModalStore.on('close', () => {
      this.setState({ open: false });
    });
  }

  componentWillUnmount() {
    ModalStore.removeAllListeners();
  }

  close() {
    modalActions.closeModal();
  }

  render() {
    const { id, classes, full, children } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <input className="modal-state" id={id} checked={open} type="checkbox" />
        <div
          className={
            'modal ' + (full ? 'full-modal' : '') + (classes ? classes : '')
          }
        >
          <label
            className={'modal-bg ' + (full ? 'full-modal-bg' : '')}
            htmlFor={id}
            onClick={this.close}
          />
          <div className={'modal-body ' + (full ? 'full-modal-body' : '')}>
            <label className="btn-close" htmlFor={id} onClick={this.close}>
              X
            </label>
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
