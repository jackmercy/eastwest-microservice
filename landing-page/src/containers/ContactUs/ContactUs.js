import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import csc from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';

import {
  SEO,
  Modal,
  ModalHeader,
  ModalContent,
  Input,
  Select,
  Button,
  Textarea,
  CheckBox,
  InputPhone,
} from '../../components';
import { stringUtil } from '../../utils';
import { Layout, Header, Footer, Content } from '../components';
import { PrivacyContent } from '../Privacy';
import { DEFAULT_SEO, LINKS } from '../../../configs';
import { useFormValidation, useModalState } from '../../hooks';
import { getLoading } from '../../redux/ducks/loading.duck';
import { callSendNewContactRequest } from '../../redux/ducks/form.duck';
import ModalSuccess from '../HomePage/CreateProject/ModalSuccess';
import { gaService } from '../../services';

import validate from './validate';
import useStyles from './contactUs.styles';

const ContactUs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(getLoading);
  const [openModal, toggleModal] = useModalState(false);
  const [openSuccessModel, toggleSuccessModal] = useModalState(false);
  const reasonOptions = useMemo(
    () => [
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.1' }),
        value: 1,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.2' }),
        value: 2,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.3' }),
        value: 3,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.4' }),
        value: 4,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.5' }),
        value: 5,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.6' }),
        value: 6,
      },
      {
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.OPTION.7' }),
        value: 7,
      },
    ],
    [intl],
  );
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
  const countryOptions = useMemo(
    () =>
      csc
        .getAllCountries()
        .map((item) => ({ label: item.name, value: item.isoCode })),
    [],
  );
  const {
    errors,
    formValues,
    handleResetFieldError,
    handleSetMultipleFieldValues,
    handleSetFieldValue,
    handleResetFormValues,
    translateError,
    handleSubmit,
  } = useFormValidation(
    {
      address: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      emailAddress: '',
      description: '',
      country: null,
      city: null,
      reason: router.query?.defaultReason
        ? reasonOptions.find(
          (r) => r.value === Number(router.query.defaultReason),
        )
        : null,
      agreeWithTerms: false,
      phoneCode: phoneCodeOptions.find((item) => item.default),
    },
    validate,
  );
  const cityOptions = useMemo(
    () =>
      (formValues.country
        ? csc
          .getStatesOfCountry(formValues.country.value)
          .map((item) => ({ label: item.name, value: item.isoCode }))
        : []),
    [formValues],
  );
  const formConfigs = useMemo(
    () => [
      {
        component: Select,
        options: reasonOptions,
        name: 'reason',
        label: intl.formatMessage({ id: 'CONTACT.FORM.REASON.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.REASON.PLACEHOLDER',
        }),
        dataTest: 'contact-form-select-reason',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'firstName',
        label: intl.formatMessage({ id: 'CONTACT.FORM.FIRST_NAME.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.FIRST_NAME.PLACEHOLDER',
        }),
        className: classes.form50,
        dataTest: 'contact-form-input-first-name',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'lastName',
        label: intl.formatMessage({ id: 'CONTACT.FORM.LAST_NAME.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.LAST_NAME.PLACEHOLDER',
        }),
        className: classes.form50,
        dataTest: 'contact-form-input-last-name',
        required: true,
      },
      {
        component: Input,
        type: 'email',
        name: 'emailAddress',
        label: intl.formatMessage({ id: 'CONTACT.FORM.EMAIL_ADDRESS.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.EMAIL_ADDRESS.PLACEHOLDER',
        }),
        dataTest: 'contact-form-input-email-address',
        required: true,
      },
      {
        component: Select,
        options: phoneCodeOptions,
        name: 'phoneCode',
        label: intl.formatMessage({ id: 'CONTACT.FORM.PHONE_NUMBER.LABEL' }),
        className: classes.form30,
        isSearchable: true,
        dataTest: 'contact-form-select-phone-code',
        required: true,
      },
      {
        component: InputPhone,
        name: 'phoneNumber',
        label: intl.formatMessage({ id: 'CONTACT.FORM.PHONE_NUMBER.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.PHONE_NUMBER.PLACEHOLDER',
        }),
        className: classes.form70,
        labelClassName: classes.formInputPhoneLabel,
        dataTest: 'contact-form-input-phone-number',
        required: true,
      },
      {
        component: Input,
        type: 'text',
        name: 'address',
        label: intl.formatMessage({ id: 'CONTACT.FORM.ADDRESS.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.ADDRESS.PLACEHOLDER',
        }),
        dataTest: 'contact-form-input-address',
      },
      {
        component: Select,
        options: countryOptions,
        name: 'country',
        label: intl.formatMessage({ id: 'CONTACT.FORM.COUNTRY.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.COUNTRY.PLACEHOLDER',
        }),
        isSearchable: true,
        dataTest: 'contact-form-select-country',
      },
      {
        component: Select,
        options: cityOptions,
        name: 'city',
        label: intl.formatMessage({ id: 'CONTACT.FORM.CITY.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.CITY.PLACEHOLDER',
        }),
        isSearchable: true,
        noOptionsMessage: () =>
          intl.formatMessage({ id: 'CONTACT.FORM.CITY.EMPTY' }),
        dataTest: 'contact-form-select-city',
      },
      {
        component: Textarea,
        name: 'description',
        label: intl.formatMessage({ id: 'CONTACT.FORM.DESCRIPTION.LABEL' }),
        placeholder: intl.formatMessage({
          id: 'CONTACT.FORM.DESCRIPTION.PLACEHOLDER',
        }),
        dataTest: 'contact-form-textarea-description',
      },
    ],
    [
      intl,
      classes,
      reasonOptions,
      countryOptions,
      cityOptions,
      phoneCodeOptions,
    ],
  );

  const handleSendEmail = () => {
    handleSubmit((formValues) => {
      dispatch(
        callSendNewContactRequest({
          formValues: {
            reason: formValues.reason.label,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            emailAddress: formValues.emailAddress,
            // eslint-disable-next-line max-len
            phoneNumber: `(+${formValues.phoneCode.code}) ${formValues.phoneNumber}`,
            address: formValues.address,
            country: formValues.country.label,
            city: formValues.city.label,
            description: formValues.description,
          },
          callback: (success) => {
            if (success) {
              toggleSuccessModal();
              gaService.event({
                action: 'submit',
                params: { form: 'contact', formValues },
              });
            }
          },
        }),
      );
    });
  };

  const handleFieldChange = ({ target, name, value }) => {
    if (name === 'country' && formValues.city) {
      handleSetMultipleFieldValues({
        [name]: value,
        city: null,
      });

      return;
    }
    if (target) {
      handleSetFieldValue(target.name, target.value);
    } else {
      handleSetFieldValue(name, value);
    }
  };

  const handleCloseSuccessModal = () => {
    handleResetFormValues();
    toggleSuccessModal();
  };

  return (
    <Layout>
      <SEO {...DEFAULT_SEO.PAGES.CONTACT} />
      <Header />
      <div className={classes.teaser} data-test="contact-teaser-image">
        <Content className={classes.teaserContent}>
          <h1 className={classes.teaserTitle} data-test="contact-teaser-title">
            {intl.formatMessage({ id: 'CONTACT.TEASER.TITLE' })}
          </h1>
          <p
            className={classes.teaserDescription}
            data-test="contact-teaser-description"
          >
            {intl.formatMessage({ id: 'CONTACT.TEASER.DESCRIPTION' })}
          </p>
        </Content>
      </div>
      <Content id="contact-form" className={classes.content}>
        <div className={classes.form}>
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
          <div className={classes.formCheckBox}>
            <CheckBox
              name="agreeWithTerms"
              label={intl.formatMessage({
                id: 'CONTACT.FORM.AGREE_WITH_TERMS',
              })}
              defaultChecked={formValues.agreeWithTerms}
              onChange={({ target: { name, checked } }) => {
                handleSetFieldValue(name, checked);
              }}
              dataTest="contact-form-checkbox-privacy"
            />
            &nbsp;
            <span
              role="presentation"
              className={classes.formTerms}
              onClick={toggleModal}
            >
              {intl.formatMessage({
                id: 'CONTACT.FORM.AGREE_WITH_TERMS.PRIVACY_POLICY',
              })}
            </span>
          </div>
          <Button
            size="large"
            color="primary"
            disabled={!formValues.agreeWithTerms || isLoading}
            className={classes.formButton}
            onClick={handleSendEmail}
            dataTest="contact-form-button-submit"
          >
            {intl.formatMessage({ id: 'CONTACT.FORM.BUTTON.SUBMIT' })}
          </Button>
        </div>
        <div className={classes.contact}>
          <img
            alt="cover"
            loading="lazy"
            src="/static/images/contact/cover.png"
            srcSet={[
              '/static/images/contact/cover.png 500w',
              '/static/images/contact/cover@2x.png 1500w',
              '/static/images/contact/cover@3x.png 2000w',
            ].join(', ')}
            className={classes.contactImage}
            data-test="contact-info-image"
          />
          <div className={classes.contactLayout}>
            <div className={classes.contact50}>
              <h2 className={classes.contactRegion}>
                {intl.formatMessage({ id: 'CONTACT.INFO.REGION.1' })}
              </h2>
              <h3 className={classes.contactLabel}>
                {intl.formatMessage({ id: 'CONTACT.INFO.ADDRESS' })}
              </h3>
              <p
                className={classes.contactText}
                data-test="contact-info-ireland-address"
              >
                {intl.formatMessage({ id: 'CONTACT.INFO.ADDRESS.1' })}
              </p>
            </div>
            <div className={classes.contact50}>
              <h2 className={classes.contactRegion}>
                {intl.formatMessage({ id: 'CONTACT.INFO.REGION.2' })}
              </h2>
              <h3 className={classes.contactLabel}>
                {intl.formatMessage({ id: 'CONTACT.INFO.ADDRESS' })}
              </h3>
              <p
                className={classes.contactText}
                data-test="contact-info-vietnam-address"
              >
                {intl.formatMessage({ id: 'CONTACT.INFO.ADDRESS.2' })}
              </p>
            </div>
          </div>
          <div className={classes.contactLayout}>
            <div className={classes.contact50}>
              <h2 className={classes.contactLabel}>
                {intl.formatMessage({ id: 'CONTACT.INFO.PHONE' })}
              </h2>
              <a
                href={`tel:${stringUtil.removeSpaces(DEFAULT_SEO.PHONENUMBER)}`}
                className={classNames(
                  classes.contactText,
                  classes.contactPhone,
                )}
                data-test="contact-info-phone-number"
              >
                <i className="icon-phone" />
                {DEFAULT_SEO.PHONENUMBER}
              </a>
            </div>
            <div className={classes.contact50}>
              <Link href="/create-a-ticket" passHref>
                <a
                  href="/#"
                  className={classNames(
                    classes.contactText,
                    classes.contactLink,
                  )}
                  data-test="contact-info-cta-create-ticket"
                >
                  {intl.formatMessage({ id: 'CONTACT.INFO.CREATE_TICKET' })}
                </a>
              </Link>
            </div>
          </div>
          <div className={classes.contactLayout}>
            <div className={classes.contact100}>
              <h2 className={classes.contactLabel}>
                {intl.formatMessage({ id: 'CONTACT.INFO.SERVICES' })}
              </h2>
              <p
                className={classes.contactText}
                data-test="contact-info-link-messenger"
              >
                <i className="icon-messenger" />
                <a
                  href={LINKS.SOCIALS.MESSENGER}
                  title={LINKS.SOCIALS.MESSENGER}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.contactLink}
                >
                  {LINKS.SOCIALS.MESSENGER}
                </a>
              </p>
              <p
                className={classes.contactText}
                data-test="contact-info-link-linkedin"
              >
                <i className="icon-linkedin-white" />
                <a
                  href={LINKS.SOCIALS.LINKEDIN}
                  title={LINKS.SOCIALS.LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.contactLink}
                >
                  {LINKS.SOCIALS.LINKEDIN}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
      <Modal open={openModal} toggle={toggleModal} className={classes.modal}>
        <ModalHeader toggle={toggleModal} title="Privacy policy" />
        <ModalContent>
          <PrivacyContent />
        </ModalContent>
      </Modal>
      <ModalSuccess
        open={openSuccessModel}
        toggle={handleCloseSuccessModal}
        name={`${formValues.firstName} ${formValues.lastName}`}
      />
    </Layout>
  );
};

export default memo(ContactUs);
