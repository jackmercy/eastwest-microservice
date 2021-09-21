import Link from 'next/link';
import { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Button } from '../../../../components';
import { Content } from '../../../components';

import useStyles from './joinUs.styles';

const JoinUs = ({ description, defaultReason }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Content className={classes.content}>
        <h2 className={classes.description} data-test="join-us-description">
          {description}
        </h2>
        <Link
          href={`/contact/?defaultReason=${defaultReason}#contact-form`}
          passHref
          as="/contact/#contact-form"
        >
          <Button
            tag="a"
            color="secondary"
            size="large"
            keepSizeOnMobile
            className={classes.button}
            dataTest="join-us-cta"
          >
            {intl.formatMessage({ id: 'DATA_LABS.JOIN_US.BUTTON' })}
          </Button>
        </Link>
      </Content>
    </div>
  );
};
JoinUs.propTypes = {
  description: PropTypes.string.isRequired,
  defaultReason: PropTypes.number.isRequired,
};

export default memo(JoinUs);
