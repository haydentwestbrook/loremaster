import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';

class Lookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  render() {
    const { active } = this.props;
    return (
      <Subscribe to={[FiveEContainer]}>
        {api => <div className={'lookup ' + (active ? 'active' : '')} />}
      </Subscribe>
    );
  }
}

export default Lookup;
