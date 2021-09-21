import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Content } from '../../components';
import { Input, Button, Textarea, InputPhone } from '../../../components';
import { useFormValidation, useModalState } from '../../../hooks';
import { getLoading } from '../../../redux/ducks/loading.duck';
import { callSendNewProspectRequest } from '../../../redux/ducks/form.duck';
import { gaService } from '../../../services';

import validate from './validate';
import ModalSuccess from './ModalSuccess';
import useStyles from './createProject.styles';

const CreateProject = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const [openModal, toggleModal] = useModalState(false);
  const formConfigs = useMemo(
    () => [
      {
        component: Input,
        type: 'text',
        name: 'firstName',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.FIRST_NAME.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.FIRST_NAME.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-first-name',
        value: '',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'lastName',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.LAST_NAME.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.LAST_NAME.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-last-name',
        value: '',
        required: true,
      },
      {
        component: Input,
        type: 'email',
        name: 'emailAddress',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.EMAIL_ADDRESS.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.EMAIL_ADDRESS.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-email-address',
        value: '',
        required: true,
      },
      {
        component: InputPhone,
        name: 'phoneNumber',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.PHONE_NUMBER.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.PHONE_NUMBER.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-phone-number',
        value: '',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'companyName',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COMPANY_NAME.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COMPANY_NAME.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-company-name',
        value: '',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'title',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.TITLE.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.TITLE.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-title',
        value: '',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'country',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COUNTRY.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COUNTRY.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-input-country',
        value: '',
        required: true,
      },
      {
        component: Textarea,
        name: 'description',
        label: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COMMENT.LABEL',
        }),
        placeholder: intl.formatMessage({
          id: 'HOMEPAGE.CREATE_PROJECT.FORM.COMMENT.PLACEHOLDER',
        }),
        dataTest: 'create-project-form-textarea-comment',
        value: '',
      },
    ],
    [intl],
  );
  const {
    errors,
    formValues,
    handleResetFormValues,
    handleResetFieldError,
    handleSetFieldValue,
    translateError,
    handleSubmit,
  } = useFormValidation({}, validate);

  const handleSendEmail = () => {
    handleSubmit((formValues) =>
      dispatch(
        callSendNewProspectRequest({
          formValues,
          callback: (success) => {
            if (success) {
              toggleModal();
              gaService.event({
                action: 'submit',
                params: { form: 'prospect', formValues },
              });
            }
          },
        }),
      ));
  };

  const handleFieldChange = ({ target, name, value }) => {
    if (target) {
      handleSetFieldValue(target.name, target.value);
    } else {
      handleSetFieldValue(name, value);
    }
  };

  const handleCloseModal = () => {
    handleResetFormValues();
    toggleModal();
  };

  return (
    <>
      <Content id="create-project-form" className={classes.root}>
        <h2 className={classes.title} data-test="create-project-title">
          {intl.formatMessage({ id: 'HOMEPAGE.CREATE_PROJECT.TITLE' })}
        </h2>
        <p
          className={classes.description}
          data-test="create-project-description"
        >
          {intl.formatMessage({ id: 'HOMEPAGE.CREATE_PROJECT.DESCRIPTION' })}
        </p>
        <div className={classes.content}>
          <div className={classes.form}>
            {formConfigs.map(
              ({ component: Component, className, value, ...rest }) => (
                <Component
                  size="large"
                  key={rest.name}
                  onChange={handleFieldChange}
                  onFocus={() => handleResetFieldError(rest.name)}
                  error={translateError(errors[rest.name])}
                  disabled={isLoading}
                  className={classes.formInput}
                  value={formValues[rest.name] || value}
                  {...rest}
                />
              ),
            )}
            <Button
              size="large"
              color="primary"
              disabled={isLoading}
              className={classes.formButton}
              onClick={handleSendEmail}
              dataTest="create-project-form-button-submit"
            >
              {intl.formatMessage({
                id: 'HOMEPAGE.CREATE_PROJECT.FORM.BUTTON.SUBMIT',
              })}
            </Button>
          </div>
          <img
            alt="cover"
            loading="lazy"
            src="/static/images/homepage/cover.png"
            srcSet={[
              '/static/images/homepage/cover.png 500w',
              '/static/images/homepage/cover@2x.png 1500w',
              '/static/images/homepage/cover@3x.png 2000w',
            ].join(', ')}
            className={classes.coverImage}
            data-test="create-project-image"
          />
        </div>
      </Content>
      <ModalSuccess
        open={openModal}
        toggle={handleCloseModal}
        name={`${formValues.firstName} ${formValues.lastName}`}
      />
    </>
  );
};

export default memo(CreateProject);
