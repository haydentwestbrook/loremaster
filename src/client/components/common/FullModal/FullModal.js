import React, { Component } from 'react';
import ModalStore from '../../stores/ModalStore';
import { modalActions } from '../../stores/actions';

class FullModal extends Component {
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
      console.log('closing');
      this.setState({ open: false });
    });
  }

  componentWillUnmount() {
    ModalStore.removeAllListeners();
  }

  close() {
    console.log('clicked close');
    modalActions.closeModal();
  }

  render() {
    const { id, classes, children } = this.props;
    const { open } = this.state;
    return open ? (
      <React.Fragment>
        <div className={'full-modal ' + classes}>
          <div className="full-modal-body">
            <label
              className="full-modal-close"
              htmlFor={id}
              onClick={this.close}
            >
              X
            </label>
            {children}
          </div>
          <div className="full-modal-bg" onClick={this.close} />
        </div>
      </React.Fragment>
    ) : null;
  }
}

export default FullModal;
