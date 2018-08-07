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
      raceData: [],
      count: 0
    };

    this.tempRaceData = [];

    this.getBody = this.getBody.bind(this);
    this.loadData = this.loadData.bind(this);
    this.getSubraces = this.getSubraces.bind(this);
  }

  loadData(api) {
    if (this.state.raceData.length < 1) {
      this.setState({ loaded: false });
      api.get({ section: "races" }).then(res => {
        this.setState({ count: res.count });
        _.forEach(res.results, res => {
          api.getUrl(res.url).then(res => {
            this.setState(state => {
              return { count: state.count + res.subraces.length };
            });
            let race = Object.assign({}, res, { subraces: [] });
            this.setState(
              state => {
                return {
                  count: state.count - 1,
                  raceData: state.raceData.concat(race),
                  loaded: state.count - 1 === 0
                };
              },
              () => {
                this.getSubraces(race, res.subraces, api);
              }
            );
          });
        });
      });
    }
  }

  getSubraces(race, subraces, api) {
    _.forEach(subraces, subrace => {
      api.getUrl(subrace.url).then(res => {
        if (res) {
          race.subraces.push(res);
        }
        this.setState(state => {
          return {
            count: state.count - 1,
            loaded: state.count - 1 === 0
          };
        });
      });
    });
  }

  getBody(api) {
    if (!this.state.loaded || !this.state.raceData) {
      return <Loading type="small" />;
    } else {
      const races = this.state.raceData;
      return races.map(race => {
        if (race.subraces.length > 0) {
          return race.subraces.map(subrace => {
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

  componentDidMount() {
    const { api, race, subrace } = this.props;
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
