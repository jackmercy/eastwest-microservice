import { memo } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { Content } from '../../components';
import { Button } from '../../../components';

import useStyles from './contactUs.styles';

const ContactUs = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root} data-test="contact-us-cover-image">
      <Content className={classes.content}>
        <h2 className={classes.title} data-test="contact-us-title">
          {intl.formatMessage({ id: 'HOMEPAGE.CONTACT_US.TITLE' })}
        </h2>
        <Link href="/contact" passHref>
          <Button
            tag="a"
            size="large"
            color="primary"
            keepSizeOnMobile
            className={classes.button}
            dataTest="contact-us-button"
          >
            {intl.formatMessage({ id: 'HOMEPAGE.CONTACT_US.BUTTON' })}
          </Button>
        </Link>
      </Content>
    </div>
  );
};

export default memo(ContactUs);
