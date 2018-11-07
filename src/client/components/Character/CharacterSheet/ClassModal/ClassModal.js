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
    const id = 'modal-class';
    const { write, info, api } = this.props;

    const renderBody = [];

    if (!write) return null;
    return (
      <React.Fragment>
        <label
          className="modal-open fas fa-edit icon icon-edit"
          htmlFor={id}
          onClick={modalActions.openModal}
        />
        <FullModal id={id} classes={'class-modal'}>
          <h4 className="modal-title">Class and Level</h4>
          {renderBody}
        </FullModal>
      </React.Fragment>
    );
  }
}

export default ClassModal;
