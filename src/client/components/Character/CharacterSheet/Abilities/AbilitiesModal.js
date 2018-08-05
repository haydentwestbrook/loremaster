import React, { Component } from 'react';
import Modal from '../../../common/Modal/Modal';
import Input from '../../../common/Input/Input';
import InfoString from '../../../common/InfoString/InfoString';
import { getLabel } from './AbilitiesHelper';

class AbilitiesModal extends Component {
  constructor(props) {
    super(props);

    this.renderAbilities = this.renderAbilities.bind(this);
  }

  renderAbilities = () => {
    const { abilities, write, update } = this.props;
    return Object.keys(abilities).map(key => {
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
  };

  render() {
    const id = 'modal-abilities';
    const { write, abilities } = this.props;

    if (!write) return null;
    return (
      <React.Fragment>
        <label
          className="abilities-modal__open modal-open fas fa-edit icon icon-edit"
          htmlFor={id}
        />
        <Modal id={id}>
          <h4 className="modal-title">Base Abilities</h4>
          {this.renderAbilities()}
        </Modal>
      </React.Fragment>
    );
  }
}

export default AbilitiesModal;
