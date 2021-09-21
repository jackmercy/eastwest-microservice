import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  Teaser,
  JoinUs,
  Become,
  HowItWorks,
  ReadyToStart,
} from '../components';

import AboutProduct from './AboutProduct';
import Reviews from './Reviews';

const Brands = () => {
  const intl = useIntl();
  const sectionProps = useMemo(
    () => ({
      teaser: {
        image: '/static/images/data-labs/brands/teaser.png',
        mobileImage: '/static/images/data-labs/brands/teaser-mobile.png',
        purpose: intl.formatMessage({ id: 'DATA_LABS.TEASER.FOR_BRANDS' }),
        description: intl.formatMessage({
          id: 'DATA_LABS.TEASER.FOR_BRANDS.DESCRIPTION',
        }),
        otherText: intl.formatMessage({
          id: 'DATA_LABS.TEASER.FOR_INFLUENCERS',
        }),
        defaultReason: 4,
        isBrands: true,
      },
      howItWorks: {
        title: intl.formatMessage({
          id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.TITLE',
        }),
        description: intl.formatMessage({
          id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.DESCRIPTION',
        }),
        data: [
          {
            key: 'active',
            image: '/static/images/data-labs/brands/hiw-01.png',
            icon: '/static/images/data-labs/brands/hiw-icon-01.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.01.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.01.DESCRIPTION',
            }),
          },
          {
            key: 'tools',
            image: '/static/images/data-labs/brands/hiw-02.png',
            icon: '/static/images/data-labs/brands/hiw-icon-02.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.02.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.02.DESCRIPTION',
            }),
          },
          {
            key: 'segmentation',
            image: '/static/images/data-labs/brands/hiw-03.png',
            icon: '/static/images/data-labs/brands/hiw-icon-03.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.03.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.03.DESCRIPTION',
            }),
          },
          {
            key: 'matching-engine',
            image: '/static/images/data-labs/brands/hiw-04.png',
            icon: '/static/images/data-labs/brands/hiw-icon-04.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.04.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.04.DESCRIPTION',
            }),
          },
          {
            key: 'data',
            image: '/static/images/data-labs/brands/hiw-05.png',
            icon: '/static/images/data-labs/brands/hiw-icon-05.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.05.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BRANDS.HOW_IT_WORKS.05.DESCRIPTION',
            }),
          },
        ],
      },
      become: {
        title: intl.formatMessage({ id: 'DATA_LABS.BECOME_BRAND.TITLE' }),
        data: [
          {
            key: 'brand-become-01',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.01.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.01.DESCRIPTION',
            }),
            number: 165,
            image: '/static/images/data-labs/become-01.png',
            countUpConfigs: { prefix: '', suffix: '+' },
          },
          {
            key: 'brand-become-02',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.02.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.02.DESCRIPTION',
            }),
            number: 300,
            image: '/static/images/data-labs/become-02.png',
            countUpConfigs: { prefix: '', suffix: '+' },
          },
          {
            key: 'brand-become-03',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.03.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_BRAND.03.DESCRIPTION',
            }),
            number: 80,
            image: '/static/images/data-labs/become-03.png',
            countUpConfigs: { prefix: '', suffix: '+' },
          },
        ],
      },
      readyToStart: { defaultReason: 4 },
      joinUs: {
        description: intl.formatMessage({ id: 'DATA_LABS.JOIN_US.BRAND' }),
        defaultReason: 4,
      },
    }),
    [intl],
  );

  return (
    <>
      <Teaser {...sectionProps.teaser} />
      <HowItWorks {...sectionProps.howItWorks} />
      <AboutProduct />
      <Become {...sectionProps.become} />
      <ReadyToStart {...sectionProps.readyToStart} />
      <Reviews />
      <JoinUs {...sectionProps.joinUs} />
    </>
  );
};

export default memo(Brands);
