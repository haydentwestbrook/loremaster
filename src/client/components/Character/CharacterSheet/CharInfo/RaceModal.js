import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import _ from 'lodash';
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
      loaded: false,
      races: [],
      subraces: []
    };

    this.renderBody = this.renderBody.bind(this);
    this.loadRaces = this.loadRaces.bind(this);
    this.loadSubraces = this.loadSubraces.bind(this);
    this.loadSubrace = this.loadSubrace.bind(this);
    this.matchSubraces = this.matchSubraces.bind(this);
  }

  componentDidMount() {
    const { api } = this.props;
    let count = { races: 0, subraces: 0 };
    this.loadRaces(api, count);
    this.loadSubraces(api, count);
  }

  loadRaces(api, count) {
    if (this.state.races.length < 1) {
      api.get({ section: 'races' }).then(res => {
        count['races'] += res.count;
        _.forEach(res.results, race => {
          this.loadRace(race, api, count);
        });
      });
    }
  }

  loadRace(race, api, count) {
    api.getUrl(race.url).then(res => {
      count['races'] -= 1;
      this.setState(state => {
        return {
          races: state.races.concat(res),
          loaded: this.isLoaded(count)
        };
      });
    });
  }

  loadSubraces(api, count) {
    if (this.state.subraces.length < 1) {
      api.get({ section: 'subraces' }).then(res => {
        count['subraces'] += res.count;
        _.forEach(res.results, subrace => {
          this.loadSubrace(subrace, api, count);
        });
      });
    }
  }

  loadSubrace(subrace, api, count) {
    api.getUrl(subrace.url).then(res => {
      count['subraces'] -= 1;
      this.setState(state => {
        return {
          subraces: state.subraces.concat(res),
          loaded: this.isLoaded(count)
        };
      });
    });
  }

  isLoaded(count) {
    return count['races'] < 1 && count['subraces'] < 1;
  }

  matchSubraces(race) {
    const subraces = this.state.subraces;
    return _.filter(subraces, subrace => {
      return subrace.race.name === race.name;
    });
  }

  renderBody() {
    const { races, loaded } = this.state;
    if (!loaded || !races) {
      return <Loading type="small" />;
    } else {
      return (
        <div className="row flex-spaces tabs">{this.renderTabs(races)}</div>
      );
    }
  }

  renderTabs(races) {
    return races.map(race => {
      const { name } = race;
      return (
        <React.Fragment key={name}>
          <input
            id={'race-modal-tab-' + name}
            type="radio"
            name="race-modal-tabs"
            readOnly
            defaultChecked={name === 'Human'}
          />
          <label htmlFor={'race-modal-tab-' + name}>{name}</label>
        </React.Fragment>
      );
    });
  }

  render() {
    const id = 'modal-race';
    const { write, info, api } = this.props;

    if (!write) return null;
    return (
      <React.Fragment>
        <label className="modal-open fas fa-edit icon icon-edit" htmlFor={id} />
        <Modal id={id} classes={'race-modal'}>
          <h4 className="modal-title">Race</h4>
          {this.renderBody()}
        </Modal>
      </React.Fragment>
    );
  }
}

class RaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      data: null
    };
  }

  render() {
    const { loaded, data } = this.state;
    if (!loaded) return <Loading type="small" />;
    return <p>data.name</p>;
  }
}

const RaceModalWrapper = props => {
  return (
    <Subscribe to={[FiveEContainer]}>
      {api => <RaceModal {...props} api={api} />}
    </Subscribe>
  );
};

export default RaceModalWrapper;
