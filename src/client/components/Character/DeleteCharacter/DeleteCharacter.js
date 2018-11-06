import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { deleteCharacter } from '../../stores/actions';
import Authorize from '../../Authentication/Authorize';
import Loading from '../../Loading/Loading';

class DeleteCharacterInternal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const index = this.props.match.params.index;
    deleteCharacter(index);
  }

  render() {
    return <Redirect to={'/characters/'} />;
  }
}

const DeleteCharacterWrapper = props => {
  return (
    <Authorize redirect={true}>
      <DeleteCharacterInternal {...props} />
    </Authorize>
  );
};

export default DeleteCharacterWrapper;
