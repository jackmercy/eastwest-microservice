import { memo, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import csc from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalContent,
  Input,
  Select,
  Button,
  CheckBox,
  InputPhone,
  FieldError,
} from '../../../components';
import { Content } from '../../components';
import { PrivacyContent } from '../../Privacy';
import { useFormValidation, useModalState } from '../../../hooks';
import { getLoading } from '../../../redux/ducks/loading.duck';
import { callSendNewApplicationRequest } from '../../../redux/ducks/form.duck';
import { scrollToElement } from '../../../utils';
import { gaService } from '../../../services';

import validate, { formKeys } from './validate';
import Successful from './Successful';
import useStyles from './application.styles';

const Application = ({ vacancyId }) => {
  const intl = useIntl();
  const classes = useStyles();
  const avatarRef = useRef();
  const resumeRef = useRef();
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const [openModal, toggleModal] = useModalState(false);
  const [openSuccessUI, toggleSuccessUI] = useModalState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const phoneCodeOptions = useMemo(
    () =>
      csc.getAllCountries().map((item) => ({
        label: `${item.name} (+${item.phonecode})`,
        value: item.isoCode,
        code: item.phonecode,
        default: item.isoCode === 'VN',
      })),
    [],
  );
  const {
    errors,
    formValues,
    handleSetFieldValue,
    handleResetFormValues,
    handleResetFieldError,
    translateError,
    handleSubmit,
  } = useFormValidation(
    {
      [formKeys.avatar]: undefined,
      [formKeys.firstName]: '',
      [formKeys.lastName]: '',
      [formKeys.emailAddress]: '',
      [formKeys.phoneNumber]: '',
      [formKeys.address]: '',
      [formKeys.linkedinProfile]: '',
      [formKeys.knownFrom]: '',
      [formKeys.agreeWithTerms]: false,
      [formKeys.resumes]: [],
      [formKeys.phoneCode]: phoneCodeOptions.find((item) => item.default),
    },
    validate,
  );
  const formConfigs = useMemo(
    () => [
      {
        component: Input,
        type: 'text',
        name: formKeys.firstName,
        label: intl.formatMessage({ id: 'VACANCY.FORM.FIRST_NAME.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.FIRST_NAME.PLACEHOLDER',
        }),
        className: classes.form50,
        dataTest: 'application-input-first-name',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: formKeys.lastName,
        label: intl.formatMessage({ id: 'VACANCY.FORM.LAST_NAME.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.LAST_NAME.PLACEHOLDER',
        }),
        className: classes.form50,
        dataTest: 'application-input-last-name',
        required: true,
      },
      {
        component: Input,
        type: 'email',
        name: formKeys.emailAddress,
        label: intl.formatMessage({ id: 'VACANCY.FORM.EMAIL_ADDRESS.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.EMAIL_ADDRESS.PLACEHOLDER',
        }),
        dataTest: 'application-input-email-address',
        required: true,
      },
      {
        component: Select,
        options: phoneCodeOptions,
        name: formKeys.phoneCode,
        label: intl.formatMessage({ id: 'VACANCY.FORM.PHONE_NUMBER.LABEL' }),
        className: classes.form30,
        isSearchable: true,
        dataTest: 'application-select-phone-code',
        required: true,
      },
      {
        component: InputPhone,
        name: formKeys.phoneNumber,
        label: intl.formatMessage({ id: 'VACANCY.FORM.PHONE_NUMBER.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.PHONE_NUMBER.PLACEHOLDER',
        }),
        className: classes.form70,
        labelClassName: classes.formInputPhoneLabel,
        dataTest: 'application-input-phone-number',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: formKeys.address,
        label: intl.formatMessage({ id: 'VACANCY.FORM.ADDRESS.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.ADDRESS.PLACEHOLDER',
        }),
        dataTest: 'application-input-address',
      },
      {
        component: Input,
        type: 'text',
        name: formKeys.linkedinProfile,
        label: intl.formatMessage({ id: 'VACANCY.FORM.LINKEDIN.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.LINKEDIN.PLACEHOLDER',
        }),
        dataTest: 'application-input-linkedin',
      },
      {
        component: Input,
        type: 'text',
        name: formKeys.knownFrom,
        label: intl.formatMessage({ id: 'VACANCY.FORM.KNOWN_FROM.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'VACANCY.FORM.KNOWN_FROM.PLACEHOLDER',
        }),
        dataTest: 'application-input-known-from',
        required: true,
      },
    ],
    [intl, classes, phoneCodeOptions],
  );

  const handleSendEmail = () => {
    handleSubmit((formValues) => {
      dispatch(
        callSendNewApplicationRequest({
          formValues: {
            vacancy: vacancyId,
            avatar: formValues[formKeys.avatar],
            firstName: formValues[formKeys.firstName],
            lastName: formValues[formKeys.lastName],
            emailAddress: formValues[formKeys.emailAddress],
            phoneNumber: `(+${formValues[formKeys.phoneCode].code}) ${
              formValues[formKeys.phoneNumber]
            }`,
            address: formValues[formKeys.address],
            linkedinProfile: formValues[formKeys.linkedinProfile],
            knownFrom: formValues[formKeys.knownFrom],
            resumes: formValues[formKeys.resumes],
          },
          callback: (success) => {
            if (success) {
              toggleSuccessUI();
              scrollToElement('list-tabs');
              handleResetFormValues();
              if (avatarRef.current) {
                avatarRef.current.value = null;
              }
              if (resumeRef.current) {
                resumeRef.current.value = null;
              }
              gaService.event({
                action: 'submit',
                params: { form: 'vacancy-application', formValues },
              });
            }
          },
        }),
      );
    });
  };

  const handleFieldChange = ({ target, name, value }) => {
    if (target) {
      handleSetFieldValue(target.name, target.value);
    } else {
      handleSetFieldValue(name, value);
    }
  };

  const handleUploadAvatar = ({ target: { name, files } }) => {
    if (files && files[0]) {
      handleSetFieldValue(name, files[0]);
      handleResetFieldError(name);
      setAvatarPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleUploadResumes = ({ target: { name, files } }) => {
    if (files) {
      const newResumes = [...formValues[formKeys.resumes], ...files];
      handleSetFieldValue(name, newResumes);
      handleResetFieldError(name);
    }
  };

  const handleRemoveResume = (index) => {
    const newResumes = [...formValues[formKeys.resumes]];
    newResumes.splice(index, 1);
    handleSetFieldValue(formKeys.resumes, newResumes);
    if (resumeRef.current) {
      resumeRef.current.value = null;
    }
  };

  return !openSuccessUI ? (
    <>
      <Content className={classes.content}>
        <div className={classes.form}>
          <div className={classes.avatar} data-test="application-input-avatar">
            <div className={classes.avatarPreviewWrapper}>
              {avatarPreview ? (
                <img
                  alt="avatar"
                  src={avatarPreview}
                  className={classes.avatarPreview}
                />
              ) : (
                <div className={classes.avatarDefault}>
                  <i className="icon-avatar" />
                </div>
              )}
            </div>
            {errors[formKeys.avatar] ? (
              <FieldError error={translateError(errors[formKeys.avatar])} />
            ) : null}
            <Button
              className={classes.avatarButton}
              color="secondary"
              tag="label"
            >
              {intl.formatMessage({ id: 'VACANCY.FORM.AVATAR.UPLOAD' })}
              <input
                ref={avatarRef}
                type="file"
                name={formKeys.avatar}
                accept="image/*"
                className={classes.inputHidden}
                onChange={handleUploadAvatar}
              />
            </Button>
          </div>
          {formConfigs.map(({ component: Component, className, ...rest }) => (
            <Component
              size="large"
              key={rest.name}
              onChange={handleFieldChange}
              onFocus={() => handleResetFieldError(rest.name)}
              error={translateError(errors[rest.name])}
              disabled={isLoading}
              className={classNames(classes.formInput, className)}
              value={formValues[rest.name]}
              {...rest}
            />
          ))}
          <div className={classes.resume} data-test="application-input-resumes">
            <p className={classes.resumeLabel}>
              {intl.formatMessage({ id: 'VACANCY.FORM.RESUME.LABEL' })}
            </p>
            <Button
              size="large"
              tag="label"
              color="secondary"
              className={classes.resumeButton}
            >
              <i className="icon-plus" />
              <input
                ref={resumeRef}
                type="file"
                // eslint-disable-next-line max-len
                accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                name={formKeys.resumes}
                className={classes.inputHidden}
                onChange={handleUploadResumes}
              />
            </Button>
          </div>
          {errors[formKeys.resumes] ? (
            <FieldError error={translateError(errors[formKeys.resumes])} />
          ) : null}
          {formValues[formKeys.resumes].length > 0 ? (
            <ul className={classes.listResumes}>
              {formValues[formKeys.resumes].map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`resume-${index}`} className={classes.resumeItem}>
                  <span className={classes.resumeName}>{item.name}</span>
                  <span
                    role="presentation"
                    className={classes.resumeRemoveButton}
                    onClick={() => handleRemoveResume(index)}
                  >
                    <i className="icon-trash" />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className={classes.formCheckBox}>
            <CheckBox
              name={formKeys.agreeWithTerms}
              label={intl.formatMessage({
                id: 'VACANCY.FORM.AGREE_WITH_TERMS',
              })}
              defaultChecked={formValues.agreeWithTerms}
              onChange={({ target: { name, checked } }) => {
                handleSetFieldValue(name, checked);
              }}
              dataTest="application-checkbox-privacy"
            />
            &nbsp;
            <span
              role="presentation"
              className={classes.formTerms}
              onClick={toggleModal}
            >
              {intl.formatMessage({
                id: 'VACANCY.FORM.AGREE_WITH_TERMS.PRIVACY_POLICY',
              })}
            </span>
          </div>
          <Button
            size="large"
            color="primary"
            disabled={!formValues.agreeWithTerms || isLoading}
            className={classes.formButton}
            onClick={handleSendEmail}
            dataTest="application-button-submit"
          >
            {intl.formatMessage({ id: 'VACANCY.FORM.BUTTON.SUBMIT' })}
          </Button>
        </div>
      </Content>
      <Modal open={openModal} toggle={toggleModal} className={classes.modal}>
        <ModalHeader toggle={toggleModal} title="Privacy policy" />
        <ModalContent>
          <PrivacyContent />
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Successful onBack={toggleSuccessUI} />
  );
};
Application.propTypes = {
  vacancyId: PropTypes.string.isRequired,
};

export default memo(Application);
