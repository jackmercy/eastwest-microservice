import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './button.styles';

const Button = forwardRef(
  (
    {
      tag,
      size,
      color,
      disabled,
      children,
      dataTest,
      className,
      keepSizeOnMobile,
      ...restProps
    },
    ref,
  ) => {
    const classes = useStyles();
    // Have to to this to fix error
    // React.createElement: type is invalid -- expected a string or a class/function but got: undefined
    const Component = `${tag}`;

    return (
      <Component
        ref={ref}
        className={classNames(
          classes.root,
          size,
          color,
          disabled && 'disabled',
          keepSizeOnMobile && 'keepSize',
          className,
        )}
        disabled={disabled}
        data-test={dataTest || 'component-button-root'}
        {...restProps}
      >
        {children}
      </Component>
    );
  },
);
Button.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  keepSizeOnMobile: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};
Button.defaultProps = {
  dataTest: '',
  className: '',
  tag: 'button',
  size: 'medium',
  disabled: false,
  color: 'primary',
  keepSizeOnMobile: false,
};

export default memo(Button);
