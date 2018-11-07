import React, { Component } from 'react';
import Modal from '../../../common/Modal/Modal';
import Input from '../../../common/Input/Input';
import InfoString from '../../../common/InfoString/InfoString';
import { getLabel } from './AbilitiesHelper';

class AbilitiesModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = 'modal-abilities';
    const { write, abilities, update } = this.props;

    const renderAbilities = Object.keys(abilities).map(key => {
      const value = abilities[key];
      return (
        <div className="abilities-modal__abilities" key={key}>
          <Input
            label={getLabel(key)}
            write={write}
            value={value}
            onChange={e => update({ [key]: parseInt(e.target.value) })}
            validation="number"
          />
        </div>
      );
    });

    if (!write) return null;
    return (
      <React.Fragment>
        <label
          className="abilities-modal__open modal-open fas fa-edit icon icon-edit"
          htmlFor={id}
        />
        <Modal id={id}>
          <h4 className="modal-title">Base Abilities</h4>
          {renderAbilities}
        </Modal>
      </React.Fragment>
    );
  }
}

export default AbilitiesModal;
