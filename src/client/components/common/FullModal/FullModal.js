import React, { Component } from "react";

const FullModal = props => {
  const { id, classes } = props;
  return (
    <React.Fragment>
      <input className="modal-state" id={id} type="checkbox" />
      <div className={"modal full-modal " + classes}>
        <label className="modal-bg" htmlFor={id} />
        <div className="full-modal-background" />
        <div className="modal-body full-modal-body">
          <label className="btn-close" htmlFor={id}>
            X
          </label>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullModal;
