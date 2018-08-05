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
          ? `col-${num} `
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

const Collapsible = props => {
  const { label, id, checked } = props;
  return (
    <Column num="12">
      <div className="collapsible">
        <input
          id={id}
          type="checkbox"
          name="collapsible"
          defaultChecked={checked}
        />
        <label htmlFor={id}>{label}</label>
        <div className="collapsible-body">{props.children}</div>
      </div>
    </Column>
  );
};

export { Row, Column, Collapsible };
