import React, { Component } from 'react';
import _ from 'lodash';
import FullModal from '../../../common/FullModal/FullModal';
import Loading from '../../../Loading/Loading';
import fiveE from '../../../../resources/FiveE';
import { modalActions } from '../../../stores/actions';

class ClassModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const id = 'class-modal';
    const { write, info, api } = this.props;

    if (!write) return null;
    return (
      <React.Fragment>
        <label
          className="modal-open fas fa-edit icon icon-edit"
          htmlFor={id}
          onClick={() => modalActions.openModal(id)}
        />
        <FullModal id={id} classes={'class-modal'}>
          <h4 className="modal-title">Class and Level</h4>
          <ClassModalBody />
        </FullModal>
      </React.Fragment>
    );
  }
}

const ClassModalBody = props => {
  return <h4>Class modal</h4>;
};

export default ClassModal;
