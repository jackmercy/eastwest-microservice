import { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './content.styles';

const Content = ({ className, children, ...restProps }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...restProps}>
      {children}
    </div>
  );
};
Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Content.defaultProps = { className: '' };

export default memo(Content);
