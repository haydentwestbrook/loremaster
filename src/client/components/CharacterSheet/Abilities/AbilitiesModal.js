import React from "react";
import Modal from "../../common/Modal/Modal";
import Input from "../../common/Input/Input";

const AbilitiesModal = props => {
  const id = "abilities-modal";
  const { update, abilities, write } = props;

  if (!write) return null;

  const renderAbilities = Object.keys(abilities).map(key => {
    const value = abilities[key];
    return (
      <div className="abilities-modal__abilities" key={key}>
        <Input
          label={key}
          write={write}
          value={value}
          onChange={e => update({ [key]: e.target.value })}
          validation="number"
        />
      </div>
    );
  });

  return (
    <React.Fragment>
      <label className="edit" htmlFor={"modal-" + id}>
        E
      </label>
      <Modal id={id}>
        <h4 className="modal-title">Base Abilities</h4>
        {renderAbilities}
      </Modal>
    </React.Fragment>
  );
};

export default AbilitiesModal;
