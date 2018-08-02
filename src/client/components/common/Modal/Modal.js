import React, { Component } from "react";

const Modal = props => {
  const id = props.id;
  return (
    <React.Fragment>
      <input className="modal-state" id={"modal-" + id} type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor={"modal-" + id} />
        <div className="modal-body">
          <label className="btn-close" htmlFor={"modal-" + id}>
            X
          </label>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
