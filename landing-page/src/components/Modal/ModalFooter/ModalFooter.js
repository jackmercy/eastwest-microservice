import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../Button';

import useStyles from './modalFooter.styles';

const ModalFooter = ({
  children,
  className,
  cancelButtonProps,
  submitButtonProps,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...restProps}>
      {children}
      {cancelButtonProps ? (
        <Button
          color="tertiary"
          className={classNames(classes.button, cancelButtonProps.className)}
          dataTest="modal-footer-button-cancel"
          {...cancelButtonProps}
        />
      ) : null}
      {submitButtonProps ? (
        <Button
          color="primary"
          className={classNames(classes.button, submitButtonProps.className)}
          dataTest="modal-footer-button-submit"
          {...submitButtonProps}
        />
      ) : null}
    </div>
  );
};
ModalFooter.propTypes = {
  cancelButtonProps: PropTypes.object,
  submitButtonProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};
ModalFooter.defaultProps = {
  className: '',
  children: null,
  cancelButtonProps: undefined,
  submitButtonProps: undefined,
};

export default memo(ModalFooter);
