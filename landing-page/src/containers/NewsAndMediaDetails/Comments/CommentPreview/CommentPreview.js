import { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { PopupMenu, StaticHTML } from '../../../../components';
import { useOnClickOutside } from '../../../../hooks';
import CommentBox from '../CommentBox';

import useStyles from './commentPreview.styles';

const CommentPreview = ({ data, className, children, ...props }) => {
  const buttonRef = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [liked, setLike] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useOnClickOutside(buttonRef, () => {
    setShowMenu(false);
  });

  const formatUpdatedDate = useCallback(
    (updatedDate) => {
      const intervals = [
        {
          label: intl.formatMessage({ id: 'DATE.YEAR' }),
          labelPlural: intl.formatMessage({ id: 'DATE.YEAR.PLURAL' }),
          seconds: 31536000,
        },
        {
          label: intl.formatMessage({ id: 'DATE.MONTH' }),
          labelPlural: intl.formatMessage({ id: 'DATE.MONTH.PLURAL' }),
          seconds: 2592000,
        },
        {
          label: intl.formatMessage({ id: 'DATE.DAY' }),
          labelPlural: intl.formatMessage({ id: 'DATE.DAY.PLURAL' }),
          seconds: 86400,
        },
        {
          label: intl.formatMessage({ id: 'DATE.HOUR' }),
          labelPlural: intl.formatMessage({ id: 'DATE.HOUR.PLURAL' }),
          seconds: 3600,
        },
        {
          label: intl.formatMessage({ id: 'DATE.MINUTE' }),
          labelPlural: intl.formatMessage({ id: 'DATE.MINUTE.PLURAL' }),
          seconds: 60,
        },
        {
          label: intl.formatMessage({ id: 'DATE.SECOND' }),
          labelPlural: intl.formatMessage({ id: 'DATE.SECOND.PLURAL' }),
          seconds: 1,
        },
        {
          label: intl.formatMessage({ id: 'DATE.NOW' }),
          labelPlural: intl.formatMessage({ id: 'DATE.NOW' }),
          seconds: 0,
        },
      ];

      const seconds = Math.floor(
        (Date.now() - new Date(updatedDate).getTime()) / 1000,
      );
      const interval = intervals.find((i) => i.seconds <= seconds);
      const number = interval.seconds
        ? Math.floor(seconds / interval.seconds)
        : interval.seconds;

      return number
        ? intl.formatMessage(
          { id: 'NEWS.DETAILS.COMMENT.LAST_UPDATED' },
          {
            number,
            timing: number !== 1 ? interval.labelPlural : interval.label,
          },
        )
        : interval.label;
    },
    [intl],
  );

  const handleToggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleToggleOtherComments = useCallback(() => {
    setShowOthers(!showOthers);
  }, [showOthers]);

  const handleLikeComment = useCallback(() => {
    setLike(!liked);
  }, [liked]);

  const handleReplyButtonClick = useCallback(() => {
    setShowCommentBox(true);
  }, [showCommentBox]);

  const handleSubmitReply = useCallback(() => {
    // TODO integration
  }, []);

  const handleCancelReply = useCallback(() => {
    setShowCommentBox(false);
  }, [showCommentBox]);

  const handleEditComment = useCallback(() => {
    // TODO integration
  }, []);

  const handleDeleteComment = useCallback(() => {
    // TODO integration
  }, []);

  return (
    <div className={classNames(classes.root, className)} {...props}>
      <div className={classes.avatarWrapper}>
        <img
          alt="avatar"
          className={classes.avatar}
          src={data?.user?.avatar}
          data-test="comment-preview-avatar"
        />
      </div>
      <div className={classes.information}>
        <div className={classes.summary}>
          <p className={classes.name} data-test="comment-preview-name">
            {data?.user?.firstName}&nbsp;{data?.user?.lastName}
            <span className={classes.date} data-test="comment-preview-date">
              {formatUpdatedDate(data.updatedAt)}
            </span>
          </p>
          <button
            ref={buttonRef}
            className={classes.options}
            onClick={handleToggleMenu}
            data-test="comment-preview-options"
          >
            <i className="icon-three-dots-vertical" />
            <PopupMenu
              show={showMenu}
              menuPosition="right"
              className={classes.popupMenu}
              list={[
                {
                  key: 'edit-comment',
                  label: intl.formatMessage({
                    id: 'NEWS.DETAILS.COMMENT.EDIT',
                  }),
                  onClick: handleEditComment,
                },
                {
                  key: 'delete-comment',
                  label: intl.formatMessage({
                    id: 'NEWS.DETAILS.COMMENT.DELETE',
                  }),
                  onClick: handleDeleteComment,
                },
              ]}
            />
          </button>
        </div>
        <p className={classes.comment} data-test="comment-preview-comment">
          {/* {data.comment} */}
          <StaticHTML
            stringHtml={
              data.comment ? data.comment.replace(/\r?\n/g, '<br/>') : ''
            }
          />
        </p>
        <div className={classes.actions}>
          <p
            className={classNames(classes.like, liked && 'liked')}
            data-test="comment-preview-likes"
          >
            <i
              className={liked ? 'icon-heart-fill' : 'icon-heart'}
              role="presentation"
              onClick={handleLikeComment}
            />
            {data.likes.length}
          </p>
          <button
            className={classes.reply}
            disabled={showCommentBox}
            onClick={handleReplyButtonClick}
            data-test="comment-preview-reply-button"
          >
            {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.REPLY' })}
          </button>
        </div>
        {showCommentBox ? (
          <CommentBox
            parent={data.id}
            className={classes.commentBox}
            onCancel={handleCancelReply}
            onSubmit={handleSubmitReply}
          />
        ) : null}
        {data.replies.length > 0 ? (
          <>
            <p
              role="presentation"
              className={classNames(classes.othersButton, showOthers && 'show')}
              onClick={handleToggleOtherComments}
            >
              {intl.formatMessage(
                {
                  id: showOthers
                    ? 'NEWS.DETAILS.COMMENT.HIDE_OTHERS'
                    : 'NEWS.DETAILS.COMMENT.SHOW_OTHERS',
                },
                { number: 2 },
              )}
              <i className="icon-caret-down" />
            </p>
            {showOthers ? children : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
CommentPreview.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    replies: PropTypes.array,
  }).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
CommentPreview.defaultProps = {
  className: '',
  children: null,
};

export default memo(CommentPreview);
