import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../../../containers/FiveEContainer/FiveEContainer';
import Modal from '../../../common/Modal/Modal';
import Loading from '../../../Loading/Loading';
import Input from '../../../common/Input/Input';
import InfoString from '../../../common/InfoString/InfoString';
import { Collapsible } from '../../../common/Markup/Markup';

class RaceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      raceList: null
    };

    this.getBody = this.getBody.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(api) {
    if (!this.state.raceList) {
      this.setState({ loaded: false });
      api
        .get({ section: 'races' })
        .then(res => this.setState({ loaded: true, raceList: res.results }));
    }
  }

  getBody(api) {
    if (!this.state.loaded || !this.state.raceList) {
      return <Loading type="small" />;
    } else {
      const races = this.state.raceList;
      return races.map(race => {
        const { name, url } = race;
        return (
          <Collapsible key={name} id={'race-modal-' + name} label={name}>
            <RaceDetails race={race} api={api} />
          </Collapsible>
        );
      });
    }
  }

  render() {
    const id = 'modal-race';
    const { write, info } = this.props;

    if (!write) return null;
    return (
      <Subscribe to={[FiveEContainer]}>
        {api => (
          <React.Fragment>
            <label
              className="modal-open fas fa-edit icon icon-edit"
              htmlFor={id}
              onClick={() => this.loadData(api)}
            />
            <Modal id={id}>
              <h4 className="modal-title">Race</h4>
              {this.getBody(api)}
            </Modal>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

class RaceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      data: null
    };
  }

  componentDidMount() {
    const { api, race } = this.props;
    if (!this.state.data) {
      this.setState({ loaded: false });
      api
        .getUrl(race.url)
        .then(res => this.setState({ loaded: true, data: res }));
    }
  }

  render() {
    const { loaded, data } = this.state;
    if (!loaded) return <Loading type="small" />;
    return <p>data.name</p>;
  }
}

export default RaceModal;
