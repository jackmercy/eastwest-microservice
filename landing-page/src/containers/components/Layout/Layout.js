import { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useStyles from './layout.styles';

const Layout = ({ className, children }) => {
  const classes = useStyles();

  return <div className={classNames(classes.root, className)}>{children}</div>;
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Layout.defaultProps = { className: '' };

export default memo(Layout);
