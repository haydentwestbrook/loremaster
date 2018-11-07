import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { characterActions as actions } from '../../stores/actions';
import withAuthorize from '../../Authentication/Authorize';
import Loading from '../../Loading/Loading';

class DeleteCharacter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const index = this.props.match.params.index;
    actions.deleteCharacter(index);
  }

  render() {
    return <Redirect to={'/characters/'} />;
  }
}

export default withAuthorize(DeleteCharacter);
