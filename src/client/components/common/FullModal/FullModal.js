import React, { Component } from 'react';
import ModalStore from '../../stores/ModalStore';
import { modalActions } from '../../stores/actions';

class FullModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: ModalStore.getState()
    };
  }

  componentDidMount() {
    ModalStore.on('open', () => {
      this.setState({ open: true });
    });
    ModalStore.on('close', () => {
      this.setState({ open: false });
    });
  }

  componentWillUnmount() {
    ModalStore.removeAllListeners();
  }

  close = () => {
    modalActions.closeModal();
  };

  render() {
    const { id, classes, children } = this.props;
    const { open } = this.state;
    return open ? (
      <React.Fragment>
        <input className="modal-state" id={id} type="checkbox" />
        <div className={'modal full-modal ' + classes}>
          <label className="modal-bg" htmlFor={id} />
          <div className="full-modal-background" />
          <div className="modal-body full-modal-body">
            <label className="btn-close" htmlFor={id} onClick={this.close}>
              X
            </label>
            {children}
          </div>
        </div>
      </React.Fragment>
    ) : null;
  }
}

export default FullModal;
