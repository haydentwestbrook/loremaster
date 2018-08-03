import React, { Component } from "react";
import { Subscribe } from "unstated";
import FiveEContainer from "../../containers/FiveEContainer/FiveEContainer";
import Modal from "../../common/Modal/Modal";
import Loading from "../../Loading/Loading";

class InfoStringInternal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      body: null
    };
  }

  componentDidMount() {
    const { api, children, search } = this.props;
    //api.get(search).then(res => this.setState({ body: res.desc }));
  }

  getBody() {
    const { loaded, body } = this.state;
    if (loaded) {
      return <p className="modal-text">{body}</p>;
    } else {
      return <Loading />;
    }
  }

  render() {
    const children = props.children;
    const id = "info-string-" + children;
    return (
      <React.Fragment>
        <label className="info-string" htmlFor={id}>
          {children}
        </label>
        <Modal id={id}>
          <h4 className="modal-title">{children}</h4>
          {getBody()}
        </Modal>
      </React.Fragment>
    );
  }
}

const InfoStringWrapper = props => {
  return (
    <Subscribe to={[FiveEContainer]}>
      {api => <InfoStringInternal {...props} api={api} />}}
    </Subscribe>
  );
};

export default InfoStringWrapper;
