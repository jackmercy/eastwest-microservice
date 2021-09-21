import { memo } from 'react';
import { useIntl } from 'react-intl';

import { LINKS } from '../../../../configs';

import useStyles from './introduction.styles';

const Introduction = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={classes.title} data-test="introduction-title">
        {intl.formatMessage({ id: 'HOMEPAGE.INTRODUCTION.TITLE' })}
      </h2>
      <div className={classes.video}>
        <div className={classes.ratio}>
          <iframe
            title="East West Introduction"
            className={classes.iframe}
            src={LINKS.HOMEPAGE.INTRO_VIDEO}
            frameBorder="0"
            loading="lazy"
            // eslint-disable-next-line max-len
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-test="introduction-video"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Introduction);
