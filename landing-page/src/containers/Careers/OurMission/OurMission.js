import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { SectionTitle } from '../components';

import useStyles from './ourMission.styles';

const OurMission = ({ id }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <>
      <SectionTitle id={id} translateId="CAREERS.OUR_MISSION.TITLE" />
      <p className={classes.text}>
        {intl.formatMessage({ id: 'CAREERS.OUR_MISSION.TEXT.01' })}
      </p>
      <img
        alt="our mission"
        className={classes.image}
        src="/static/images/careers/our-mission.png"
      />
      <p className={classes.text}>
        {intl.formatMessage({ id: 'CAREERS.OUR_MISSION.TEXT.02' })}
      </p>
    </>
  );
};
OurMission.propTypes = { id: PropTypes.string.isRequired };

export default memo(OurMission);
