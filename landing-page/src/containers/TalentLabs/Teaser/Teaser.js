import { memo } from 'react';
import { useIntl } from 'react-intl';

import { Logo } from '../../../components';

import useStyles from './teaser.styles';

const Teaser = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.coverImage} data-test="teaser-cover-image" />
      <div className={classes.content}>
        <Logo
          type="talent-labs"
          className={classes.logo}
          dataTest="teaser-cover-talent-labs-logo"
        />
        <h2 className={classes.title} data-test="teaser-title">
          {intl.formatMessage({ id: 'TALENT_LABS.TEASER.TITLE' })}
        </h2>
        <p className={classes.description} data-test="teaser-description">
          {intl.formatMessage({ id: 'TALENT_LABS.TEASER.DESCRIPTION' })}
        </p>
      </div>
    </div>
  );
};

export default memo(Teaser);
