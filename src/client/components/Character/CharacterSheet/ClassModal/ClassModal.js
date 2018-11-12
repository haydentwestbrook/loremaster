import React, { Component } from 'react';
import _ from 'lodash';
import Modal from '../../../common/Modal/Modal';
import Loading from '../../../Loading/Loading';
import fiveE from '../../../../resources/FiveE';
import { modalActions } from '../../../stores/actions';

class ClassModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { write, info, api, id } = this.props;

    if (!write) return null;
    return (
      <React.Fragment>
        <Modal id={id} classes={'class-modal'} full={true}>
          <h4 className="modal-title">Class and Level</h4>
          <ClassModalBody />
        </Modal>
      </React.Fragment>
    );
  }
}

const ClassModalBody = props => {
  return <h4>Class modal</h4>;
};

export default ClassModal;
