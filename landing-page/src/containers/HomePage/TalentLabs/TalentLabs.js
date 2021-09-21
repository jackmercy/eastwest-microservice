import { memo } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { Content } from '../../components';
import { Logo, Button } from '../../../components';

import useStyles from './talentLabs.styles';

const TalentLabs = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.root} data-test="talent-labs-cover-image">
      <Content className={classes.contentLayout}>
        <div className={classes.content}>
          <Logo
            type="talent-labs"
            className={classes.logo}
            dataTest="talent-labs-logo"
          />
          <p
            className={classes.description}
            data-test="talent-labs-description"
          >
            {intl.formatMessage({ id: 'HOMEPAGE.TALENT_LABS.DESCRIPTION' })}
          </p>
          <Link href="/talent-labs" passHref>
            <Button
              tag="a"
              size="large"
              color="primary"
              keepSizeOnMobile
              className={classes.button}
              dataTest="talent-labs-button"
            >
              {intl.formatMessage({ id: 'HOMEPAGE.TALENT_LABS.BUTTON' })}
            </Button>
          </Link>
        </div>
      </Content>
    </div>
  );
};

export default memo(TalentLabs);
