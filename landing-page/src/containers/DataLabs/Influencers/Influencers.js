import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  Teaser,
  JoinUs,
  Become,
  HowItWorks,
  ReadyToStart,
} from '../components';

import Reviews from './Reviews';

const Influencers = () => {
  const intl = useIntl();
  const sectionProps = useMemo(
    () => ({
      teaser: {
        image: '/static/images/data-labs/influencers/teaser.png',
        mobileImage: '/static/images/data-labs/influencers/teaser-mobile.png',
        purpose: intl.formatMessage({ id: 'DATA_LABS.TEASER.FOR_INFLUENCERS' }),
        description: intl.formatMessage({
          id: 'DATA_LABS.TEASER.FOR_INFLUENCERS.DESCRIPTION',
        }),
        otherText: intl.formatMessage({
          id: 'DATA_LABS.TEASER.FOR_BRANDS',
        }),
        defaultReason: 5,
      },
      howItWorks: {
        title: intl.formatMessage({
          id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.TITLE',
        }),
        description: intl.formatMessage({
          id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.DESCRIPTION',
        }),
        data: [
          {
            key: 'join',
            image: '/static/images/data-labs/influencers/hiw-01.png',
            icon: '/static/images/data-labs/influencers/hiw-icon-01.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.01.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.01.DESCRIPTION',
            }),
          },
          {
            key: 'setup',
            image: '/static/images/data-labs/influencers/hiw-02.png',
            icon: '/static/images/data-labs/influencers/hiw-icon-02.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.02.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.02.DESCRIPTION',
            }),
          },
          {
            key: 'matching-engine',
            image: '/static/images/data-labs/influencers/hiw-03.png',
            icon: '/static/images/data-labs/influencers/hiw-icon-03.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.03.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.03.DESCRIPTION',
            }),
          },
          {
            key: 'choose-project',
            image: '/static/images/data-labs/influencers/hiw-04.png',
            icon: '/static/images/data-labs/influencers/hiw-icon-04.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.04.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.04.DESCRIPTION',
            }),
          },
          {
            key: 'get-compensated',
            image: '/static/images/data-labs/influencers/hiw-05.png',
            icon: '/static/images/data-labs/influencers/hiw-icon-05.png',
            title: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.05.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.INFLUENCERS.HOW_IT_WORKS.05.DESCRIPTION',
            }),
          },
        ],
      },
      become: {
        title: intl.formatMessage({ id: 'DATA_LABS.BECOME_INFLUENCER.TITLE' }),
        data: [
          {
            key: 'brand-become-01',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.01.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.01.DESCRIPTION',
            }),
            number: 45,
            image: '/static/images/data-labs/become-01.png',
            countUpConfigs: { prefix: '', suffix: '%' },
          },
          {
            key: 'brand-become-02',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.02.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.02.DESCRIPTION',
            }),
            number: 18,
            image: '/static/images/data-labs/become-02.png',
            countUpConfigs: { prefix: '', suffix: '%' },
          },
          {
            key: 'brand-become-03',
            title: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.03.TITLE',
            }),
            description: intl.formatMessage({
              id: 'DATA_LABS.BECOME_INFLUENCER.03.DESCRIPTION',
            }),
            number: 1,
            image: '/static/images/data-labs/become-03.png',
            countUpConfigs: { prefix: '', suffix: '%' },
          },
        ],
      },
      readyToStart: { defaultReason: 5 },
      joinUs: {
        description: intl.formatMessage({ id: 'DATA_LABS.JOIN_US.INFLUENCER' }),
        defaultReason: 5,
      },
    }),
    [intl],
  );

  return (
    <>
      <Teaser {...sectionProps.teaser} />
      <HowItWorks {...sectionProps.howItWorks} />
      <Become {...sectionProps.become} />
      <ReadyToStart {...sectionProps.readyToStart} />
      <Reviews />
      <JoinUs {...sectionProps.joinUs} />
    </>
  );
};

export default memo(Influencers);
