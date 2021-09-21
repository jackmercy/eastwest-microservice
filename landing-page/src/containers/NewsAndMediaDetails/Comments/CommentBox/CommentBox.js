import { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import TextareaAutosize from 'react-textarea-autosize';
// eslint-disable-next-line max-len
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { useOnClickOutside } from '../../../../hooks';
import { Button, PopupMenu } from '../../../../components';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../../../../../configs';
import { callLoginAsCommunityMember } from '../../../../redux/ducks/news.duck';
import { notifyError } from '../../../../redux/ducks/notification.duck';

import useStyles from './commentBox.styles';

const CommentBox = ({ user, className, onCancel, onSubmit, ...props }) => {
  const buttonRef = useRef();
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleCancelButtonClick = useCallback(() => {
    setValue('');
    onCancel();
  }, [onCancel]);

  const handleInputChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!user) {
      setShowMenu(!showMenu);
    } else {
      onSubmit(value, (success) => {
        if (success) {
          setValue('');
        }
      });
    }
  }, [showMenu, user, value]);

  const seperateName = useCallback((name) => {
    const words = name.split(' ');

    return { firstName: words[0], lastName: words[1] };
  }, []);

  const handleSendWithFB = useCallback(
    (response) => {
      if (response && response.email && response.userID) {
        dispatch(
          callLoginAsCommunityMember({
            ...seperateName(response.name),
            avatar: response?.picture?.data?.url,
            emailAddress: response.email,
            socialId: response.userID,
          }),
        );
      } else {
        dispatch(notifyError({ message: 'NEWS.LOGIN.SOCIAL.FAILED' }));
      }
    },
    [dispatch],
  );

  const handleSendWithGG = useCallback(
    (response) => {
      if (response && response.profileObj) {
        dispatch(
          callLoginAsCommunityMember({
            ...seperateName(response.profileObj.name),
            avatar: response.profileObj.imageUrl,
            emailAddress: response.profileObj.email,
            socialId: response.profileObj.googleId,
          }),
        );
      } else {
        dispatch(notifyError({ message: 'NEWS.LOGIN.SOCIAL.FAILED' }));
      }
    },
    [dispatch],
  );

  useOnClickOutside(buttonRef, () => {
    setShowMenu(false);
  });

  return (
    <div className={classNames(classes.root, className)} {...props}>
      <TextareaAutosize
        value={value}
        minRows={3}
        maxRows={20}
        onChange={handleInputChange}
        className={classNames('custom-scrollbar', classes.input)}
        placeholder={intl.formatMessage({
          id: 'NEWS.DETAILS.COMMENT.PLACEHOLDER',
        })}
      />
      <div className={classes.buttonGroup}>
        <Button
          size="small"
          color="tertiary"
          className={classes.button}
          onClick={handleCancelButtonClick}
          dataTest="comment-box-cancel-button"
        >
          {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.BUTTON.CANCEL' })}
        </Button>
        <Button
          size="small"
          ref={buttonRef}
          color="primary"
          disabled={!value}
          className={classNames(classes.button, showMenu && 'show')}
          onClick={handleSubmit}
          dataTest="comment-box-submit-button"
        >
          {intl.formatMessage({ id: 'NEWS.DETAILS.COMMENT.BUTTON.SUBMIT' })}
          {!user ? (
            <PopupMenu
              show={showMenu}
              menuPosition="right"
              className={classes.popupMenu}
              list={[
                {
                  key: 'send-with-fb',
                  label: (
                    <FacebookLogin
                      appId={FACEBOOK_APP_ID}
                      fields="name,email,picture"
                      cssClass={classes.testButton}
                      callback={handleSendWithFB}
                      render={(renderProps) => (
                        <button
                          className={classes.socialButton}
                          onClick={renderProps.onClick}
                        >
                          {intl.formatMessage({
                            id: 'NEWS.DETAILS.COMMENT.BUTTON.SUBMIT.FB',
                          })}
                        </button>
                      )}
                    />
                  ),
                },
                {
                  key: 'send-with-gg',
                  label: (
                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      onSuccess={handleSendWithGG}
                      onFailure={handleSendWithGG}
                      cookiePolicy="single_host_origin"
                      isSignedIn={false} // keep user logged in
                      className={classes.testButton}
                      scope="https://www.googleapis.com/auth/userinfo.email"
                      render={(renderProps) => (
                        <button
                          className={classes.socialButton}
                          onClick={renderProps.onClick}
                        >
                          {intl.formatMessage({
                            id: 'NEWS.DETAILS.COMMENT.BUTTON.SUBMIT.GG',
                          })}
                        </button>
                      )}
                    />
                  ),
                },
              ]}
            />
          ) : null}
        </Button>
      </div>
    </div>
  );
};
CommentBox.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
CommentBox.defaultProps = {
  user: undefined,
  className: '',
  onCancel: () => {},
  onSubmit: () => {},
};

export default memo(CommentBox);
