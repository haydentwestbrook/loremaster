import React, { Component } from 'react';
import FiveE from '../../resources/FiveE';

class Lookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  render() {
    const { active } = this.props;
    return <div className={'lookup ' + (active ? 'active' : '')} />;
  }
}

export default Lookup;
