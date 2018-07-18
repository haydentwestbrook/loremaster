import React from 'react';

const Text = props => {
  const { value, label } = props;
  return <div className={'border border-primary'}>{value}</div>;
};

export default Text;
