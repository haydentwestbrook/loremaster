import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import Authorize from '../Authentication/Authorize';
import Loading from '../Loading/Loading';

class NewCharacterInternal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.context.getNewCharacter();
  }

  render() {
    const context = this.props.context;
    return context.state.character ? (
      <Redirect to={'/characters/' + context.state.character.num} />
    ) : (
      <Loading />
    );
  }
}

const NewCharacterWrapper = props => {
  return (
    <Authorize redirect={true}>
      <Subscribe to={[CharacterContainer]}>
        {context => <NewCharacterInternal {...props} context={context} />}
      </Subscribe>
    </Authorize>
  );
};

export default NewCharacterWrapper;
