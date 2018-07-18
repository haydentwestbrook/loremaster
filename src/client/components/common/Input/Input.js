import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange = e => {
    const { onChange, validation } = this.props;
    if (!validation) onChange(e);
    else {
      const v = e.target.value;
      if (Number(v) && validation === 'number') this.handleSuccess(e);
      else if (Boolean(v) && validation === 'boolean') this.handleSuccess(e);
      else if (typeof validation === 'function' && validation(v))
        this.handleSuccess(e);
      else this.handleError(e);
    }
  };

  handleSuccess = e => {
    const { onChange } = this.props;
    this.setState({ error: false });
    onChange(e);
  };

  handleError = e => {
    this.setState({ error: true });
  };

  render() {
    const { value, write, label, validation } = this.props;
    const { error } = this.state;
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          disabled={!write}
          className={'input-block' + (error ? ' alert alert-danger' : '')}
          type="text"
          value={error ? '' : value}
          onChange={e => {
            this.handleChange(e);
          }}
        />
        {error ? (
          <label className="input__error">
            value must be a {String(validation)}
          </label>
        ) : null}
      </div>
    );
  }
}

export default Input;
