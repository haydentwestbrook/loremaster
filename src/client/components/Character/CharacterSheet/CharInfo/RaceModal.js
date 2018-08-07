import React, { Component } from "react";
import { Subscribe } from "unstated";
import _ from "lodash";
import FiveEContainer from "../../../containers/FiveEContainer/FiveEContainer";
import Modal from "../../../common/Modal/Modal";
import Loading from "../../../Loading/Loading";
import Input from "../../../common/Input/Input";
import InfoString from "../../../common/InfoString/InfoString";
import { Collapsible } from "../../../common/Markup/Markup";

class RaceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      races: [],
      subraces: []
    };

    this.getBody = this.getBody.bind(this);
    this.loadRaces = this.loadRaces.bind(this);
    this.loadRace = this.loadRace.bind(this);
    this.loadSubraces = this.loadSubraces.bind(this);
    this.loadSubrace = this.loadSubrace.bind(this);
    this.matchSubraces = this.matchSubraces.bind(this);
  }

  loadData(api) {
    this.loadRaces(api);
    this.loadSubraces(api);
  }

  loadRaces(api) {
    if (this.state.races.length < 1) {
      //this.setState({ loaded: false });
      api.get({ section: "races" }).then(res => {
        _.forEach(res.results, race => {
          this.loadRace(race, api);
        });
      });
    }
  }

  loadRace(race, api) {
    api.getUrl(race.url).then(res => {
      this.setState(state => {
        return { races: state.races.concat(res), loaded: true };
      });
    });
  }

  loadSubraces(api) {
    if (this.state.subraces.length < 1) {
      //this.setState({ loaded: false });
      api.get({ section: "subraces" }).then(res => {
        _.forEach(res.results, subrace => {
          this.loadSubrace(subrace, api);
        });
      });
    }
  }

  loadSubrace(subrace, api) {
    api.getUrl(subrace.url).then(res => {
      this.setState(state => {
        return { subraces: state.subraces.concat(res), loaded: true };
      });
    });
  }

  matchSubraces(race) {
    const subraces = this.state.subraces;
    return race.subraces.map(subraceA => {
      _.forEach(subraces, subraceB => {
        if (subraceA.name === subraceB.name) {
          return subraceB;
        }
      });
    });
  }

  getBody(api) {
    if (!this.state.loaded || !this.state.races) {
      return <Loading type="small" />;
    } else {
      const { races } = this.state;
      return races.map(race => {
        if (race.subraces.length > 0) {
          return this.matchSubraces(race).map(subrace => {
            const { name } = subrace;
            return (
              <Collapsible key={name} id={"race-modal-" + name} label={name}>
                <RaceDetails race={race} subrace={subrace} api={api} />
              </Collapsible>
            );
          });
        } else {
          const { name } = race;
          return (
            <Collapsible key={name} id={"race-modal-" + name} label={name}>
              <RaceDetails race={race} api={api} />
            </Collapsible>
          );
        }
      });
    }
  }

  render() {
    const id = "modal-race";
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

export default RaceModal;
