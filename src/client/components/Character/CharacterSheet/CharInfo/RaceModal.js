import React, { Component } from 'react';
import _ from 'lodash';
import Modal from '../../../common/Modal/Modal';
import Loading from '../../../Loading/Loading';
import Input from '../../../common/Input/Input';
import Tabs from '../../../common/Tabs/Tabs';
import InfoString from '../../../common/InfoString/InfoString';
import { Collapsible } from '../../../common/Markup/Markup';
import fiveE from '../../../../resources/FiveE';
import { modalActions } from '../../../stores/actions';

class RaceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      races: [],
      subraces: []
    };

    this.loadRaces = this.loadRaces.bind(this);
    this.loadSubraces = this.loadSubraces.bind(this);
    this.loadSubrace = this.loadSubrace.bind(this);
    this.matchSubraces = this.matchSubraces.bind(this);
  }

  componentDidMount() {
    let count = { races: 0, subraces: 0 };
    this.loadRaces(fiveE, count);
    this.loadSubraces(fiveE, count);
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
    api.getWithUrl(race.url).then(res => {
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
    api.getWithUrl(subrace.url).then(res => {
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

  handleSelect = (race, subrace) => {
    const { update } = this.props;
    update({ race: race, subrace: subrace });
    modalActions.closeModal();
  };

  render() {
    const id = 'race-modal';
    const { write, info, api } = this.props;
    const { races, subraces, loaded } = this.state;

    const tabsContent = races.map(race => 
              <RaceDetails
                key={race.name}
                race={race}
                subraces={this.matchSubraces(race)}
                handleSelect={this.handleSelect}
              />
            );

    const body =  (

      (loaded && races) ? 

        (<Tabs id={'race-modal-tabs'} tabs={_.map(races, 'name')}>
             {tabsContent}
          </Tabs>)

        : <Loading type="small" />
  );
  

    if (!write) return null;
    return (
      <React.Fragment>
        <Modal id={id} classes={'race-modal'} full={true}>
          <h4 className="modal-title">Race</h4>
          {body}
        </Modal>
      </React.Fragment>
    );
  }
}

const RaceDetails = props => {
  const { race, subraces, handleSelect } = props;
  const hasSubraces = subraces.length > 0;

  const tabsContent = subraces.map(subrace => {
        const { name, index } = subrace;
        return (
          <React.Fragment key={index}>
            <div
              className="race-modal__subrace-content"
            >
              <p>
                <b>Ability Bonuses:</b> {subrace.ability_bonuses}
              </p>
              <p>
                <b>Description: </b> {subrace.desc}
              </p>
              <button
                className="btn-secondary"
                onClick={() => handleSelect(race, subrace)}
              >
                Select
              </button>
            </div>
          </React.Fragment>
        );
      });
    

  const tabs = <Tabs id={'race-modal-subraces-tabs'} tabs={_.map(subraces, 'name')} >{tabsContent}</Tabs>;


  return (
    <React.Fragment>
      <p>
        <b>Ability Bonues:</b> {race.ability_bonuses}
      </p>
      <p>
        <b>Alignment:</b> {race.alignment}
      </p>
      <p>
        <b>Age:</b> {race.age}
      </p>
      <p>
        <b>Size:</b> {race.size} {race.size_description}
      </p>
      <p>
        <b>Languages:</b> {race.language_desc}
      </p>
      {hasSubraces ? (
        <p>
          <b>Subraces:</b>
        </p>
      ) : null}
      <div className="race-modal__subraces row flex-spaces tabs">
        {tabs}
      </div>
      {hasSubraces ? null : (
        <button
          className="btn-secondary"
          onClick={() => handleSelect(race, null)}
        >
          Select
        </button>
      )}
    </React.Fragment>
  );
};

export default RaceModal;
