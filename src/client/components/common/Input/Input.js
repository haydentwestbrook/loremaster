import React, { Component } from 'react';
import { modalActions } from '../../stores/actions';

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

  error = () => {
    const {onError, validation} = this.props;
    if (onError) return onError;
    return (
      <span className="input__error">
        {' '}
        value must be a {String(validation)}
      </span>
    );
  };

  render() {
    const { value, write, label, validation, simple, onError, modalId } = this.props;
    const { error } = this.state;
    
    if (simple) {
      return (
        <React.Fragment>
          <input
            disabled={!write}
            className={
              'input input-block' + (error ? ' alert alert-danger' : '')
            }
            type="text"
            value={error ? '' : value}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          {error ? this.error() : null}
        </React.Fragment>
      );
    }
    return (
      <div className="form-group">
        <LabelContent modalId={modalId} label={label}/>
        <input
          disabled={!write}
          className={'input input-block' + (error ? ' alert alert-danger' : '')}
          type="text"
          value={error ? '' : value}
          onChange={e => {
            this.handleChange(e);
          }}
        />
        {error ? this.error() : null}
      </div>
    );
  }
}

const LabelContent = props => {
  const {modalId, label} = props;
  if(modalId) {
    return (
      <span onClick={() => modalActions.openModal(modalId)}>
        <label>{label}</label>
        <span
          className="modal-open fas fa-edit icon icon-edit"
          htmlFor={modalId}
        />
      </span>)
  } else {
    return <label>{label}</label>
  }
}

export default Input;
