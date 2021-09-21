import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import { Content } from '../../components';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

import WebImages from './WebImages';
import MobileImages from './MobileImages';
import useStyles from './ourOffice.styles';

const OurOffice = () => {
  const intl = useIntl();
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.maxSm}px)`,
  });
  const images = useMemo(
    () => [
      {
        key: 'cover-1',
        src: '/static/images/homepage/office-01.png',
        srcSet: [
          '/static/images/homepage/office-01.png 500w',
          '/static/images/homepage/office-01@2x.png 1500w',
          '/static/images/homepage/office-01@3x.png 2000w',
        ].join(', '),
      },
      {
        key: 'cover-2',
        src: '/static/images/homepage/office-02.png',
        srcSet: [
          '/static/images/homepage/office-02.png 500w',
          '/static/images/homepage/office-02@2x.png 1500w',
          '/static/images/homepage/office-02@3x.png 2000w',
        ].join(', '),
      },
      {
        key: 'cover-3',
        src: '/static/images/homepage/office-03.png',
        srcSet: [
          '/static/images/homepage/office-03.png 500w',
          '/static/images/homepage/office-03@2x.png 1500w',
          '/static/images/homepage/office-03@3x.png 2000w',
        ].join(', '),
      },
      {
        key: 'cover-4',
        src: '/static/images/homepage/office-04.png',
        srcSet: [
          '/static/images/homepage/office-04.png 500w',
          '/static/images/homepage/office-04@2x.png 1500w',
          '/static/images/homepage/office-04@3x.png 2000w',
        ].join(', '),
      },
    ],
    [],
  );

  const ListImages = !isMobile ? WebImages : MobileImages;

  return (
    <Content className={classes.root}>
      <h2 className={classes.title} data-test="our-office-title">
        {intl.formatMessage({ id: 'HOMEPAGE.OUR_OFFICE.TITLE' })}
      </h2>
      <ListImages images={images} />
      <h2 className={classes.introTitle}>
        {intl.formatMessage({ id: 'HOMEPAGE.OUR_OFFICE.INTRO.TITLE.1' })}
      </h2>
      <p
        className={classes.introDescription}
        data-test="our-office-description"
      >
        {intl.formatMessage({
          id: 'HOMEPAGE.OUR_OFFICE.INTRO.DESCRIPTION.1',
        })}
      </p>
      <Link href="/talent-labs" passHref>
        <a
          href="/#"
          className={classNames(classes.introDescription, classes.introLink)}
          data-test="our-office-link-talent-labs"
        >
          {intl.formatMessage({ id: 'HOMEPAGE.OUR_OFFICE.LINK.1' })}
          <i className="icon-arrow-right" />
        </a>
      </Link>
      <h2 className={classes.introTitle}>
        {intl.formatMessage({ id: 'HOMEPAGE.OUR_OFFICE.INTRO.TITLE.2' })}
      </h2>
      <p
        className={classes.introDescription}
        data-test="our-office-description"
      >
        {intl.formatMessage({
          id: 'HOMEPAGE.OUR_OFFICE.INTRO.DESCRIPTION.2',
        })}
      </p>
      <Link href="/careers" passHref>
        <a
          href="/#"
          className={classNames(classes.introDescription, classes.introLink)}
          data-test="our-office-link-careers"
        >
          {intl.formatMessage({ id: 'HOMEPAGE.OUR_OFFICE.LINK.2' })}
          <i className="icon-arrow-right" />
        </a>
      </Link>
    </Content>
  );
};

export default memo(OurOffice);
