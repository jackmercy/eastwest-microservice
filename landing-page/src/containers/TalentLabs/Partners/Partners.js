import { memo } from 'react';
import { useIntl } from 'react-intl';

import { Content } from '../../components';
import { partners } from '../../HomePage/Partners/partners.configs';

import useStyles from './partners.styles';

const Partners = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Content className={classes.content}>
        <h2 className={classes.title} data-test="partners-title">
          {intl.formatMessage({ id: 'HOMEPAGE.PARTNERS.TITLE' })}
        </h2>
        <div className={classes.partners}>
          {partners.map((item) => (
            <div key={item.name} className={classes.partnerItem}>
              <img
                loading="lazy"
                alt={item.name}
                title={item.name}
                src={item.logo}
                className={classes.partnerlogo}
              />
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
};

export default memo(Partners);
