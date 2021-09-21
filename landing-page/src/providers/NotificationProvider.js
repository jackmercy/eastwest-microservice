import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { ToastProvider, useToasts } from 'react-toast-notifications';

import { rem } from '../utils/jss';
import COLORS from '../constants/COLORS';
import BREAKPOINTS from '../constants/BREAKPOINTS';
import { getNotification } from '../redux/ducks/notification.duck';
import { TOAST_NOTIFICATION_DURATION } from '../../configs';

export const NOTIFICATION_TYPES = {
  info: {
    value: 'info',
    label: 'TOAST_NOTIFICATION.INFO.LABEL',
    icon: 'icon-circle-info',
  },
  success: {
    value: 'success',
    label: 'TOAST_NOTIFICATION.SUCCESS.LABEL',
    icon: 'icon-circle-check',
  },
  warning: {
    value: 'warning',
    label: 'TOAST_NOTIFICATION.WARNING.LABEL',
    icon: 'icon-triangle-warning',
  },
  error: {
    value: 'error',
    label: 'TOAST_NOTIFICATION.ERROR.LABEL',
    icon: 'icon-circle-close',
  },
};

const useToastNotificationStyles = createUseStyles({
  root: {
    backgroundColor: COLORS.bgWhite,
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: rem(4),
    display: 'flex',
    width: '100%',
    maxWidth: rem(600),
    flex: 'none',
    overflow: 'hidden',
    marginBottom: rem(8),
  },
  symbol: {
    flex: 'none',
    width: rem(56),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > [class^=icon-]': { fontSize: rem(24), color: COLORS.textWhite },
    '&.success': { backgroundColor: '#13B737' },
    '&.error': { backgroundColor: '#D22A2A' },
    '&.warning': { backgroundColor: '#EF870D' },
    '&.info': { backgroundColor: '#B71392' },
  },
  content: { padding: rem(16), color: COLORS.textLightBlack },
  title: {
    textTransform: 'capitalize',
    marginTop: 0,
    marginBottom: rem(4),
    fontWeight: 600,
    fontSize: rem(18),
    lineHeight: rem(28),
  },
  text: { margin: 0, fontSize: rem(16), lineHeight: rem(24) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginBottom: rem(4) },
    symbol: { width: rem(40), '& > [class^=icon-]': { fontSize: rem(20) } },
    content: { padding: rem(10) },
    title: { fontSize: rem(16), lineHeight: rem(24) },
    text: { fontSize: rem(14), lineHeight: rem(20) },
  },
});

const ToastNotification = ({ appearance, children }) => {
  const intl = useIntl();
  const classes = useToastNotificationStyles();

  return (
    <div className={classes.root}>
      <div className={classNames(classes.symbol, appearance)}>
        <i className={NOTIFICATION_TYPES[appearance].icon} />
      </div>
      <div className={classes.content}>
        <p className={classes.title}>
          {intl.formatMessage({ id: NOTIFICATION_TYPES[appearance].label })}
        </p>
        <p className={classes.text}>{children}</p>
      </div>
    </div>
  );
};
ToastNotification.propTypes = {
  appearance: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Notification = ({ children }) => {
  const intl = useIntl();
  const { addToast } = useToasts();
  const notification = useSelector(getNotification, shallowEqual);

  useEffect(() => {
    const { appearance, message, raw } = notification;
    if (!message) return;

    addToast(raw ? message : intl.formatMessage({ id: message }), {
      appearance,
    });
  }, [notification, addToast, intl]);

  return children;
};

const NotificationProvider = (props) => (
  <ToastProvider
    autoDismiss
    placement="top-right"
    autoDismissTimeout={TOAST_NOTIFICATION_DURATION}
    components={{ Toast: ToastNotification }}
  >
    <Notification {...props} />
  </ToastProvider>
);

export default NotificationProvider;
