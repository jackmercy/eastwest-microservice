import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { Logo } from '../../../../../components';

import useStyles from './summaryInfo.styles';

const SummaryInfo = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo
        type="east-west-white"
        className={classes.logo}
        dataTest="summary-info-logo"
      />
      <p className={classes.description} data-test="summary-info-description">
        {intl.formatMessage({ id: 'FOOTER.SUMMARY_INFO.DESCRIPTION' })}
      </p>
    </div>
  );
};

export default memo(SummaryInfo);
