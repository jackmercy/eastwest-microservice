import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { Button } from '../../../../components';
import { scrollToElement } from '../../../../utils';

import useStyles from './emptyComment.styles';

const EmptyComment = ({ className }) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleClick = useCallback(() => {
    scrollToElement('main-comment-box', { offset: 20 });
    setTimeout(() => {
      const el = document.querySelector('#main-comment-box textarea');
      if (el) {
        el.focus();
      }
    }, 500);
  }, []);

  return (
    <div className={classNames(classes.root, className)}>
      <img
        alt="empty"
        src="/static/images/news/empty-comment.png"
        className={classes.image}
        data-test="empty-comment-image"
      />
      <h2 className={classes.title} data-test="empty-comment-title">
        {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.EMPTY.TITLE' })}
      </h2>
      <p className={classes.description} data-test="empty-comment-description">
        {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.EMPTY.DESCRIPTION' })}
      </p>
      <Button
        color="primary"
        className={classes.button}
        dataTest="empty-comment-button"
        onClick={handleClick}
      >
        {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.EMPTY.BUTTON' })}
      </Button>
    </div>
  );
};
EmptyComment.propTypes = {
  className: PropTypes.string,
};
EmptyComment.defaultProps = {
  className: '',
};

export default memo(EmptyComment);
