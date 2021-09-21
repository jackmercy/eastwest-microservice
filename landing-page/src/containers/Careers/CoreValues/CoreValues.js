import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import WebCoreValues from './WebCoreValues';
import MobileCoreValues from './MobileCoreValues';
import useStyles from './coreValues.styles';

const CoreValues = ({ id }) => {
  const intl = useIntl();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxMd}px)`,
  });
  const coreValues = useMemo(
    () => [
      {
        key: 'strive-for-excellence',
        title: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.01.TITLE',
        }),
        titleTranslationId: 'CAREERS.CORE_VALUE.01.TITLE',
        description: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.01.TEXT',
        }),
        image: '/static/images/careers/core-value-01.png',
        srcSet: [
          '/static/images/careers/core-value-01-mobile.png 500w',
          '/static/images/careers/core-value-01.png 2000w',
        ].join(', '),
      },
      {
        key: 'think-in-solutions',
        title: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.02.TITLE',
        }),
        titleTranslationId: 'CAREERS.CORE_VALUE.02.TITLE',
        description: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.02.TEXT',
        }),
        image: '/static/images/careers/core-value-02.png',
        srcSet: [
          '/static/images/careers/core-value-02-mobile.png 500w',
          '/static/images/careers/core-value-02.png 2000w',
        ].join(', '),
      },
      {
        key: 'be-inclusive',
        title: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.03.TITLE',
        }),
        titleTranslationId: 'CAREERS.CORE_VALUE.03.TITLE',
        description: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.03.TEXT',
        }),
        image: '/static/images/careers/core-value-03.png',
        srcSet: [
          '/static/images/careers/core-value-03-mobile.png 500w',
          '/static/images/careers/core-value-03.png 2000w',
        ].join(', '),
      },
      {
        key: 'work-towards-productivity',
        title: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.04.TITLE',
        }),
        titleTranslationId: 'CAREERS.CORE_VALUE.04.TITLE',
        description: intl.formatMessage({
          id: 'CAREERS.CORE_VALUE.04.TEXT',
        }),
        image: '/static/images/careers/core-value-04.png',
        srcSet: [
          '/static/images/careers/core-value-04-mobile.png 500w',
          '/static/images/careers/core-value-04.png 2000w',
        ].join(', '),
      },
    ],
    [intl],
  );

  return (
    <div id={id} className={classes.root}>
      {!isMobile ? (
        <WebCoreValues data={coreValues} />
      ) : (
        <MobileCoreValues data={coreValues} />
      )}
    </div>
  );
};
CoreValues.propTypes = { id: PropTypes.string.isRequired };

export default memo(CoreValues);
