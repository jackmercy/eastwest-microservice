import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Button } from '../../../components';
import { Content } from '../../components';
import { scrollToElement } from '../../../utils';

import useStyles from './teaser.styles';

const Teaser = ({ CTAId }) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleCTAClick = useCallback(() => {
    scrollToElement(CTAId);
  }, [CTAId]);

  return (
    <>
      <Content className={classes.root}>
        <h1 className={classes.title} data-test="teaser-title">
          {intl.formatMessage(
            { id: 'CAREERS.TEASER.TITLE' },
            {
              span: (...chunks) => (
                <span className={classes.primary}>{chunks.join('')}</span>
              ),
            },
          )}
        </h1>
        <p className={classes.description} data-test="teaser-description">
          {intl.formatMessage({ id: 'CAREERS.TEASER.DESCRIPTION' })}
        </p>
        <Button
          color="primary"
          className={classes.button}
          dataTest="teaser-cta"
          onClick={handleCTAClick}
        >
          {intl.formatMessage({ id: 'CAREERS.TEASER.BUTTON' })}
        </Button>
      </Content>
      <div className={classes.image} data-test="teaser-image" />
    </>
  );
};
Teaser.propTypes = {
  CTAId: PropTypes.string.isRequired,
};

export default memo(Teaser);
