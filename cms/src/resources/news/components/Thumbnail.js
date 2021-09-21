import React, { useEffect, useState } from 'react';
import { Labeled, showNotification, useInput, useTranslate } from 'react-admin';
import { Button, makeStyles } from '@material-ui/core';
import { Image as ImageIcon } from '@material-ui/icons';

import { apiUtil, storageUtil } from '../../../utils';

const useStyles = makeStyles({
  labeled: { width: '100%', maxWidth: 500 },
  thumbnail: { textAlign: 'center' },
  thumbnailPreviewWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    margin: '0 auto 24px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  thumbnailDefault: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > [class^=icon-]': { fontSize: 32, color: '#8a8a8a' },
  },
  thumbnailPreview: { width: '100%' },
  thumbnailButton: { marginBottom: 16 },
  inputHidden: { display: 'none' },
  icon: { fontSize: 50 },
});

const Thumbnail = (props) => {
  const classes = useStyles();
  const translate = useTranslate();
  const [thumbnailPreview, setThumbnailPreview] = useState('');
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
          setThumbnailPreview(url);
        })
        .catch(() => {
          showNotification('Cannot get the thumbnail');
        });
    }
  }, []);

  const handleUploadThumbnail = ({ target: { name, files } }) => {
    if (files && files[0]) {
      onChange({ target: { name, value: files[0] } });
      setThumbnailPreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <Labeled {...props} isRequired={isRequired} className={classes.labeled}>
        <div className={classes.thumbnail}>
          <div className={classes.thumbnailPreviewWrapper}>
            {thumbnailPreview ? (
              <img
                alt="thumbnail"
                src={thumbnailPreview}
                className={classes.thumbnailPreview}
              />
            ) : (
              <div className={classes.thumbnailDefault}>
                <ImageIcon className={classes.icon} />
              </div>
            )}
          </div>
          <Button
            className={classes.thumbnailButton}
            color="primary"
            component="label"
          >
            Upload thumbnail
            <input
              type="file"
              name={name}
              accept="image/*"
              className={classes.inputHidden}
              onChange={handleUploadThumbnail}
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

export default Thumbnail;
