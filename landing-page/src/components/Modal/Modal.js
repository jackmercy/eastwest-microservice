import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import useStyles from './modal.styles';

const Modal = ({ children, className, open, toggle, ...restProps }) => {
  const classes = useStyles();

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={toggle}
      className={classNames(classes.root, className)}
      overlayClassName={classes.overlay}
      bodyOpenClassName={classes.body}
      ariaHideApp={false}
      {...restProps}
    >
      {children}
    </ReactModal>
  );
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func,
  className: PropTypes.string,
};
Modal.defaultProps = {
  className: '',
  toggle: undefined,
};

export default memo(Modal);
