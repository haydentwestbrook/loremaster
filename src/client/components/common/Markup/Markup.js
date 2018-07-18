import React from 'react';

const Row = props => {
  const { classes } = props;
  return (
    <div className={'row ' + (classes ? classes : '')}>{props.children}</div>
  );
};

const Column = props => {
  const { classes, lg, md, sm, num } = props;
  return (
    <div
      className={
        'col ' +
        (num
          ? `col-${num}`
          : (lg ? `lg-${lg} ` : '') +
            (md ? `md-${md} ` : '') +
            (sm ? `sm-${sm} ` : '')) +
        (classes ? classes : '')
      }
    >
      {props.children}
    </div>
  );
};

export { Row, Column };
