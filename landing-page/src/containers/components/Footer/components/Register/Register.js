import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import SectionTitle from '../SectionTitle';
import { LINKS } from '../../../../../../configs';
import { useFormValidation } from '../../../../../hooks';
import { Input, Button } from '../../../../../components';
import { getLoading } from '../../../../../redux/ducks/loading.duck';

import validate from './validate';
import useStyles from './register.styles';

const Register = () => {
  const intl = useIntl();
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const isLoading = useSelector(getLoading);
  const socials = useMemo(
    () => [
      { name: 'twitter', href: LINKS.SOCIALS.TWITTER, icon: 'icon-twitter' },
      { name: 'facebook', href: LINKS.SOCIALS.FACEBOOK, icon: 'icon-facebook' },
      // MVP removed
      // { name: 'instagram', href: LINKS.SOCIALS.INSTAGRAM, icon: 'icon-instagram' },
      { name: 'linkedin', href: LINKS.SOCIALS.LINKEDIN, icon: 'icon-linkedin' },
      { name: 'youtube', href: LINKS.SOCIALS.YOUTUBE, icon: 'icon-youtube' },
    ],
    [],
  );
  const {
    errors,
    handleResetFieldError,
    handleSetFieldValue,
    translateError,
    handleSubmit,
  } = useFormValidation({}, validate);

  const handleSendEmail = () => {
    handleSubmit((formValues) => {
      console.log(formValues);
    });
  };

  return (
    <div className={classes.root}>
      <SectionTitle
        title={intl.formatMessage({ id: 'FOOTER.REGISTER.TITLE' })}
        dataTest="register-title"
      />
      <div
        className={classes.form}
        // MVP disabled
        title={intl.formatMessage({ id: 'FOOTER.REGISTER.COMING_SOON' })}
      >
        <Input
          size="small"
          name="emailAddress"
          onChange={({ target: { name, value } }) => {
            handleSetFieldValue(name, value);
          }}
          placeholder={intl.formatMessage({
            id: 'FOOTER.REGISTER.INPUT.PLACEHOLDER',
          })}
          onFocus={() => handleResetFieldError('emailAddress')}
          error={translateError(errors.emailAddress)}
          // MVP disabled
          disabled
          // disabled={isLoading}
          className={classes.input}
          inputClassName={classes.customInput}
          dataTest="register-input"
        />
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={handleSendEmail}
          // MVP disabled
          disabled
          // disabled={isLoading}
          dataTest="register-button"
        >
          {intl.formatMessage({ id: 'FOOTER.REGISTER.BUTTON' })}
        </Button>
      </div>
      <div className={classes.socials} data-test="register-socials">
        {socials.map(({ name, icon, href }) => (
          <a
            key={`social-${name}`}
            href={href}
            target="_blank"
            title={name}
            rel="noopener noreferrer"
            className={classes.socialsItem}
          >
            <i className={icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default memo(Register);
