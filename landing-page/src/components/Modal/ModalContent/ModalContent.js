import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './modalContent.styles';

const ModalContent = ({ children, className, ...restProps }) => {
  const classes = useStyles();

  return (
    <div
      className={classNames('custom-scrollbar', classes.root, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
ModalContent.defaultProps = { className: '' };

export default memo(ModalContent);
