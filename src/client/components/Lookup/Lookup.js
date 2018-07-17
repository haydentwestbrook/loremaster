import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';

class Lookup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Subscribe to={[FiveEContainer]}>
        {api => (
          <React.Fragment>
            <button
              onClick={() => {
                api.get({ section: 'classes', index: 1 });
              }}
            >
              {api.state.fetching ? 'Loading...' : 'Click'}
            </button>
            <div>
              <span>{api.state.data ? api.state.data.name : ''}</span>
            </div>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

export default Lookup;
