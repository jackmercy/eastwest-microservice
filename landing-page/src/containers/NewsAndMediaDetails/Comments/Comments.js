import { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Button, PopupMenu } from '../../../components';
import { useOnClickOutside } from '../../../hooks';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';
import {
  getCommunityMember,
  callCreateComment,
} from '../../../redux/ducks/news.duck';
import { storageUtil } from '../../../utils';

import CommentBox from './CommentBox';
import CommentPreview from './CommentPreview';
import EmptyComment from './EmptyComment';
import useStyles from './comments.styles';

const Comments = ({ newsId, data, className }) => {
  const filterButtonRef = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState(data);
  const [showMenu, setShowMenu] = useState(false);
  const member = useSelector(getCommunityMember, shallowEqual);
  const auth = useMemo(() => {
    const auth = storageUtil.getAuth();
    if (!auth) return member;
    return auth ? JSON.parse(auth) : undefined;
  }, [member]);
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxSm}px)`,
  });

  useOnClickOutside(filterButtonRef, () => {
    setShowMenu(false);
  });

  const handleFilterButtonClick = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleFilterItemClick = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleSubmitComment = useCallback(
    (comment, parent, callback) => {
      dispatch(
        callCreateComment({
          data: {
            user: auth.id,
            news: newsId,
            comment,
            parent,
          },
          callback: (success, data) => {
            if (success && data.status === 'approved') {
              const newComments = [...comments];
              if (data.parent) {
                newComments[data.parent].unshift({ ...data, user: auth });
              } else {
                newComments.unshift({ ...data, user: auth });
              }
              setComments(newComments);
              callback(true);
            }
          },
        }),
      );
    },
    [dispatch, comments],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.titleGroup}>
        <h2 className={classes.title} data-test="comments-title">
          {comments.length}&nbsp;
          {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.TITLE' })}
        </h2>
        {comments.length > 0 ? (
          <Button
            ref={filterButtonRef}
            size="small"
            color="primary"
            onClick={handleFilterButtonClick}
            dataTest="comments-filter"
            className={classNames(classes.filterButton, showMenu && 'show')}
          >
            <i className="icon-align-left" />
            {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.FILTER' })}
            <PopupMenu
              show={showMenu}
              menuPosition={isMobile ? 'right' : 'left'}
              className={classes.popupMenu}
              list={[
                {
                  key: 'filter-top-comments',
                  label: intl.formatMessage({
                    id: 'NEWS.DETAILS.COMMENT.FILTER.TOP',
                  }),
                  onClick: handleFilterItemClick,
                },
                {
                  key: 'filter-newest-comments',
                  label: intl.formatMessage({
                    id: 'NEWS.DETAILS.COMMENT.FILTER.NEWEST',
                  }),
                  onClick: handleFilterItemClick,
                },
              ]}
            />
          </Button>
        ) : null}
      </div>
      <CommentBox
        id="main-comment-box"
        onSubmit={handleSubmitComment}
        user={auth}
      />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentPreview key={comment.id} data={comment}>
            {comment.replies.length > 0
              ? comment.replies.map((reply) => (
                <CommentPreview
                  key={reply.id}
                  data={reply}
                  onSubmit={(value) => {
                    handleSubmitComment(value, comment.id);
                  }}
                />
              ))
              : null}
          </CommentPreview>
        ))
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};
Comments.propTypes = {
  newsId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
  className: PropTypes.string,
};
Comments.defaultProps = {
  data: [],
  className: '',
};

export default memo(Comments);
