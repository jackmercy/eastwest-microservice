import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './checkBox.styles';

const CheckBox = ({ label, id, className, dataTest, name, ...restProps }) => {
  const classes = useStyles();
  const checkboxId = useMemo(() => id || name, []);

  return (
    <div
      className={classNames(classes.root, className)}
      data-test={dataTest || 'component-checkbox-root'}
    >
      <input
        {...restProps}
        id={checkboxId}
        name={name}
        type="checkbox"
        className={classes.input}
        data-test="component-checkbox-input"
      />
      <label
        htmlFor={checkboxId}
        className={classes.label}
        data-test="component-checkbox-label"
      >
        {label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  id: PropTypes.string,
  dataTest: PropTypes.string,
  className: PropTypes.string,
};
CheckBox.defaultProps = { id: '', className: '', dataTest: '' };

export default memo(CheckBox);
