import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import CharacterContainer from '../../containers/CharacterContainer/CharacterContainer';
import Authorize from '../../Authentication/Authorize';
import Loading from '../../Loading/Loading';

class DeleteCharacterInternal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const index = this.props.match.params.index;
    this.props.context.deleteCharacter(index);
  }

  render() {
    return <Redirect to={'/characters/'} />;
  }
}

const DeleteCharacterWrapper = props => {
  return (
    <Authorize redirect={true}>
      <Subscribe to={[CharacterContainer]}>
        {context => <DeleteCharacterInternal {...props} context={context} />}
      </Subscribe>
    </Authorize>
  );
};

export default DeleteCharacterWrapper;
