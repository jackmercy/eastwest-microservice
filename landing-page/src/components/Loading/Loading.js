import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import useStyles from './loading.styles';

const Loading = ({ className, open, dataTest, ...restProps }) => {
  const classes = useStyles();

  return (
    <ReactModal
      isOpen={open}
      className={classNames(classes.root, className)}
      overlayClassName={classes.overlay}
      ariaHideApp={false}
      dataTest={dataTest || 'component-loading-root'}
      {...restProps}
    >
      <img
        alt="loading"
        loading="lazy"
        src="/static/images/loading.svg"
        className={classes.loading}
        data-test="component-loading-gif"
      />
    </ReactModal>
  );
};
Loading.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  dataTest: PropTypes.string,
};
Loading.defaultProps = {
  className: '',
  dataTest: '',
};

export default memo(Loading);
