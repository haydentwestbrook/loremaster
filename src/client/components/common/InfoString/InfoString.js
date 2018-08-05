import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../../containers/FiveEContainer/FiveEContainer';
import Modal from '../../common/Modal/Modal';
import Loading from '../../Loading/Loading';
import CharacterContainer from '../../containers/CharacterContainer/CharacterContainer';

class InfoString extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      data: null
    };

    this.loadData = this.loadData.bind(this);
  }

  getBody() {
    const Template = this.props.Template;
    const { loaded, data } = this.state;
    if (loaded && data) {
      return <Template data={data} />;
    } else {
      return <Loading type="small" />;
    }
  }

  loadData(api) {
    if (!this.state.data) {
      const { search } = this.props;
      this.setState({ loaded: false });
      api.get(search).then(res => this.setState({ loaded: true, data: res }));
    }
  }

  render() {
    const children = this.props.children;
    const id = 'info-string-' + children;
    return (
      <Subscribe to={[FiveEContainer]}>
        {api => (
          <React.Fragment>
            <label
              onClick={() => this.loadData(api)}
              className="info-string text-secondary"
              htmlFor={id}
            >
              {children}
            </label>
            <Modal id={id}>
              <h4 className="modal-title">{children}</h4>
              {this.getBody()}
            </Modal>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

export default InfoString;
