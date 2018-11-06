import React, { Component } from "react";
import { Subscribe } from "unstated";
import _ from "lodash";
import FiveEContainer from "../../../containers/FiveEContainer/FiveEContainer";
import FullModal from "../../../common/FullModal/FullModal";
import Loading from "../../../Loading/Loading";
import Input from "../../../common/Input/Input";
import InfoString from "../../../common/InfoString/InfoString";
import { Collapsible } from "../../../common/Markup/Markup";

class RaceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      races: [],
      subraces: []
    };

    this.renderBody = this.renderBody.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
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
      api.get({ section: "races" }).then(res => {
        count["races"] += res.count;
        _.forEach(res.results, race => {
          this.loadRace(race, api, count);
        });
      });
    }
  }

  loadRace(race, api, count) {
    api.getUrl(race.url).then(res => {
      count["races"] -= 1;
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
      api.get({ section: "subraces" }).then(res => {
        count["subraces"] += res.count;
        _.forEach(res.results, subrace => {
          this.loadSubrace(subrace, api, count);
        });
      });
    }
  }

  loadSubrace(subrace, api, count) {
    api.getUrl(subrace.url).then(res => {
      count["subraces"] -= 1;
      this.setState(state => {
        return {
          subraces: state.subraces.concat(res),
          loaded: this.isLoaded(count)
        };
      });
    });
  }

  isLoaded(count) {
    return count["races"] < 1 && count["subraces"] < 1;
  }

  matchSubraces(race) {
    const subraces = this.state.subraces;
    return _.filter(subraces, subrace => {
      return subrace.race.name === race.name;
    });
  }

  renderBody() {
    const { races, subraces, loaded } = this.state;
    if (!loaded || !races) {
      return <Loading type="small" />;
    } else {
      return (
        <div className="row flex-spaces tabs">
          {this.renderTabs(races)}
          {this.renderDetails(races, subraces)}
        </div>
      );
    }
  }

  renderTabs(races) {
    return races.map(race => {
      const { name, index } = race;
      return (
        <React.Fragment key={index}>
          <input
            id={"tab" + index}
            type="radio"
            name="race-modal-tabs"
            defaultChecked={index === 1}
          />
          <label htmlFor={"tab" + index}>{name}</label>
        </React.Fragment>
      );
    });
  }

  renderDetails(races, subraces) {
    return races.map(race => {
      return (
        <div
          key={race.index}
          className="race-modal__content content"
          id={"content" + race.index}
        >
          <RaceDetails race={race} subraces={this.matchSubraces(race)} />
        </div>
      );
    });
  }

  render() {
    const id = "modal-race";
    const { write, info, api } = this.props;

    if (!write) return null;
    return (
      <React.Fragment>
        <label className="modal-open fas fa-edit icon icon-edit" htmlFor={id} />
        <FullModal id={id} classes={"race-modal"}>
          <h4 className="modal-title">Race</h4>
          {this.renderBody()}
        </FullModal>
      </React.Fragment>
    );
  }
}

const RaceDetails = props => {
  const { race, subraces } = props;
  const hasSubraces = subraces.length > 0;

  const renderTabs = () => {
    {
      return subraces.map(subrace => {
        const { name, index } = subrace;
        return (
          <React.Fragment key={index}>
            <label htmlFor={"race-modal__subrace-tab" + index}>{name}</label>
            <input
              type="radio"
              id={"race-modal__subrace-tab" + index}
              name="race-modal-subrace-tabs"
            />
          </React.Fragment>
        );
      });
    }
  };

  const renderSubraceDetails = () => {
    {
      return subraces.map(subrace => {
        const { name, index } = subrace;
        return (
          <React.Fragment key={index}>
            <div
              className="race-modal__subrace-content"
              id={"race-modal__subrace-content" + index}
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
    }
  };

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
        {renderTabs()} {renderSubraceDetails()}
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

const RaceModalWrapper = props => {
  return (
    <Subscribe to={[FiveEContainer]}>
      {api => <RaceModal {...props} api={api} />}
    </Subscribe>
  );
};

export default RaceModalWrapper;
