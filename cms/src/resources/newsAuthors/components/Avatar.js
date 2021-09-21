import React, { useEffect, useState } from 'react';
import { Labeled, showNotification, useInput, useTranslate } from 'react-admin';
import { Button, makeStyles } from '@material-ui/core';
import { Face as FaceIcon } from '@material-ui/icons';

import { apiUtil, storageUtil } from '../../../utils';

const useStyles = makeStyles({
  avatar: { textAlign: 'center' },
  avatarPreviewWrapper: {
    borderRadius: '50%',
    overflow: 'hidden',
    width: 100,
    height: 100,
    margin: '0 auto 24px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  avatarDefault: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > [class^=icon-]': { fontSize: 32, color: '#8a8a8a' },
  },
  avatarPreview: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  avatarButton: { marginBottom: 16 },
  inputHidden: { display: 'none' },
  icon: { fontSize: 50 },
});

const Avatar = (props) => {
  const classes = useStyles();
  const translate = useTranslate();
  const [avatarPreview, setAvatarPreview] = useState('');
  const {
    input: { name, onChange, value },
    meta: { touched, error },
    isRequired,
  } = useInput(props);

  useEffect(() => {
    if (value && typeof value === 'string') {
      const auth = storageUtil.getAuth();
      const request = new Request(`${apiUtil.files.private}/${value}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: auth.token ? `Bearer ${auth.token}` : '',
        }),
      });

      fetch(request)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          setAvatarPreview(url);
        })
        .catch(() => {
          showNotification('Cannot get the avatar');
        });
    }
  }, []);

  const handleUploadAvatar = ({ target: { name, files } }) => {
    if (files && files[0]) {
      onChange({ target: { name, value: files[0] } });
      setAvatarPreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <Labeled {...props} isRequired={isRequired}>
        <div className={classes.avatar}>
          <div className={classes.avatarPreviewWrapper}>
            {avatarPreview ? (
              <img
                alt="avatar"
                src={avatarPreview}
                className={classes.avatarPreview}
              />
            ) : (
              <div className={classes.avatarDefault}>
                <FaceIcon className={classes.icon} />
              </div>
            )}
          </div>
          <Button
            className={classes.avatarButton}
            color="primary"
            component="label"
          >
            Upload avatar
            <input
              type="file"
              name={name}
              accept="image/*"
              className={classes.inputHidden}
              onChange={handleUploadAvatar}
            />
          </Button>
        </div>
      </Labeled>
      {!!(touched && error) && (
        // eslint-disable-next-line max-len
        <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
          {translate(error)}
        </p>
      )}
    </>
  );
};

export default Avatar;
