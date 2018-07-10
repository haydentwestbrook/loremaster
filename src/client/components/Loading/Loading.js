import React from 'react';

const Loading = props => {
  if (props.loaded) return null;
  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
