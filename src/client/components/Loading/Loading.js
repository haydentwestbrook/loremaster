import React from 'react';

const Loading = props => {
  const { loaded, type } = props;
  if (loaded) return null;
  if (type === 'small')
    return (
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    );
  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
