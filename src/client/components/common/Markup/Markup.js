import React from 'react';

const Row = props => {
  const { classes } = props;
  return <div className={'row ' + classes}>{props.children}</div>;
};

const Column = props => {
  const { classes, num } = props;
  return (
    <div className={'col ' + 'col-' + num + ' ' + classes}>
      {props.children}
    </div>
  );
};

export { Row, Column };
