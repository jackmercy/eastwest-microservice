import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './modalHeader.styles';

const ModalHeader = ({ title, children, className, toggle, ...restProps }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...restProps}>
      {toggle ? (
        <span
          role="presentation"
          onClick={toggle}
          className={classes.closeButton}
          data-test="component-modal-header-button-close"
        >
          <i className="icon-close" />
        </span>
      ) : null}
      <h2 className={classes.title} data-test="component-modal-header-title">
        {title}
      </h2>
      {children}
    </div>
  );
};
ModalHeader.propTypes = {
  title: PropTypes.node.isRequired,
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};
ModalHeader.defaultProps = {
  className: '',
  toggle: undefined,
  children: null,
};

export default memo(ModalHeader);
