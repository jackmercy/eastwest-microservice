import { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Button, Modal, ModalContent } from '../../../../components';

import useStyles from './modalSuccess.styles';

const ModalSuccess = ({ open, toggle, name }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal open={open} toggle={toggle} className={classes.modal}>
      <ModalContent className={classes.modalContent}>
        <img
          loading="lazy"
          alt="Thank for your application"
          src="/static/images/homepage/thank-you.png"
          className={classes.modalImage}
        />
        <p className={classes.modalText}>
          {intl.formatMessage(
            { id: 'HOMEPAGE.CREATE_PROJECT.MODAL.TEXT' },
            {
              name: <b>{name}</b>,
              br: <br />,
            },
          )}
        </p>
        <Button
          color="primary"
          className={classes.modalButton}
          onClick={toggle}
        >
          {intl.formatMessage({ id: 'HOMEPAGE.CREATE_PROJECT.MODAL.BUTTON' })}
        </Button>
      </ModalContent>
    </Modal>
  );
};

ModalSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(ModalSuccess);
