import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { newCharacter } from '../../stores/actions';
import NewCharacterStore from '../../stores/NewCharacterStore';
import Authorize from '../../Authentication/Authorize';
import Loading from '../../Loading/Loading';

class NewCharacterInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: null };
  }

  componentDidMount() {
    NewCharacterStore.on('loaded', () => {
      this.setState({
        index: NewCharacterStore.getNewIndex()
      });
    });
    newCharacter();
  }

  componentWillUnmount() {
    NewCharacterStore.removeAllListeners();
  }

  render() {
    const { index } = this.state;
    return index !== null ? (
      <Redirect to={'/characters/get/' + index} />
    ) : (
      <Loading />
    );
  }
}

const NewCharacterWrapper = props => {
  return (
    <Authorize redirect={true}>
      <NewCharacterInternal {...props} />
    </Authorize>
  );
};

export default NewCharacterWrapper;
