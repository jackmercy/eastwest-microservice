import { memo } from 'react';
import { useIntl } from 'react-intl';

import Content from '../Content';

import useStyles from './comingSoon.styles';

const ComingSoon = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <>
      <div className={classes.teaser} data-test="coming-soon-teaser-image">
        <Content className={classes.teaserContent}>
          <h1
            className={classes.teaserTitle}
            data-test="coming-soon-teaser-title"
          >
            {intl.formatMessage({ id: 'COMING_SOON.TEASER.TITLE' })}
          </h1>
        </Content>
      </div>
      <Content className={classes.content}>
        <img
          alt="coming soon"
          src="/static/images/coming-soon/cover.png"
          loading="lazy"
          className={classes.image}
          data-test="coming-soon-cover-image"
        />
        <h1 className={classes.title} data-test="coming-soon-title">
          {intl.formatMessage({ id: 'COMING_SOON.TITLE' })}
        </h1>
        <p className={classes.description} data-test="coming-soon-description">
          {intl.formatMessage({ id: 'COMING_SOON.DESCRIPTION' })}
        </p>
      </Content>
    </>
  );
};
export default memo(ComingSoon);
