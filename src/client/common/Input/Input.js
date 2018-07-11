import React from 'react';

const Input = props => {
  const { value, write, label, onChange } = props;

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        disabled={!write}
        className="input-block"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
