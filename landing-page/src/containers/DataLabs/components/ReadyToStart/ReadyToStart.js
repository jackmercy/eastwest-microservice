import Link from 'next/link';
import { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Content } from '../../../components';
import { Button } from '../../../../components';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

import useStyles from './readyToStart.styles';

const ReadyToStart = ({ defaultReason }) => {
  const intl = useIntl();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });

  return (
    <div className={classes.root}>
      <Content className={classes.contentWrapper}>
        <div className={classes.content}>
          {!isMobile ? (
            <img
              alt={intl.formatMessage({ id: 'DATA_LABS.READY_TO_START.TITLE' })}
              src="/static/images/data-labs/get-start-01.png"
              className={classes.image}
            />
          ) : (
            <>
              <img
                alt={intl.formatMessage({
                  id: 'DATA_LABS.READY_TO_START.TITLE',
                })}
                src="/static/images/data-labs/get-start-mobile-01.png"
                className={classes.image}
              />
              <img
                alt={intl.formatMessage({
                  id: 'DATA_LABS.READY_TO_START.TITLE',
                })}
                src="/static/images/data-labs/get-start-mobile-02.png"
                className={classes.image}
              />
            </>
          )}
          <div className={classes.group}>
            <h2 className={classes.title} data-test="ready-to-start-title">
              {intl.formatMessage({ id: 'DATA_LABS.READY_TO_START.TITLE' })}
            </h2>
            <Link
              href={`/contact/?defaultReason=${defaultReason}#contact-form`}
              passHref
              as="/contact/#contact-form"
            >
              <Button
                tag="a"
                color="primary"
                size="large"
                keepSizeOnMobile
                className={classes.button}
                dataTest="ready-to-start-button"
              >
                {intl.formatMessage({ id: 'DATA_LABS.READY_TO_START.BUTTON' })}
              </Button>
            </Link>
          </div>
        </div>
      </Content>
    </div>
  );
};
ReadyToStart.propTypes = {
  defaultReason: PropTypes.number.isRequired,
};

export default memo(ReadyToStart);
