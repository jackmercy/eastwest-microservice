import { memo } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { Content } from '../../components';
import { Button } from '../../../components';
import { scrollToElement } from '../../../utils';

import useStyles from './teaser.styles';

const Teaser = () => {
  const intl = useIntl();
  const classes = useStyles();

  const handleScrollToElement = () => {
    scrollToElement('create-project-form');
  };

  return (
    <div className={classes.root} data-test="teaser-cover-image">
      <Content className={classes.contentLayout}>
        <div className={classes.content}>
          <h1 className={classes.title} data-test="teaser-title">
            {intl.formatMessage({ id: 'HOMEPAGE.TEASER.TITLE' })}
          </h1>
          <p className={classes.description} data-test="teaser-description">
            {intl.formatMessage({ id: 'HOMEPAGE.TEASER.DESCRIPTION' })}
          </p>
          <div className={classes.buttonGroup}>
            <Button
              size="large"
              color="primary"
              keepSizeOnMobile
              className={classes.button}
              onClick={handleScrollToElement}
              dataTest="teaser-button-get-started"
            >
              {intl.formatMessage({ id: 'HOMEPAGE.TEASER.BUTTON.GET_STARTED' })}
            </Button>
            <Link href="/company" passHref>
              <Button
                tag="a"
                size="large"
                color="tertiary"
                keepSizeOnMobile
                className={classes.button}
                dataTest="teaser-button-learn-more"
              >
                {intl.formatMessage({ id: 'HOMEPAGE.TEASER.BUTTON.MORE' })}
                <i className="icon-arrow-right" />
              </Button>
            </Link>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default memo(Teaser);
