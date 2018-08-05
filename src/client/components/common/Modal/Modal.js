import React, { Component } from 'react';

const Modal = props => {
  const id = props.id;
  return (
    <React.Fragment>
      <input className="modal-state" id={id} type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor={id} />
        <div className="modal-body">
          <label className="btn-close" htmlFor={id}>
            X
          </label>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
