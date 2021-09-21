import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Content } from '../../components';

import useStyles from './technologies.styles';

const Technologies = () => {
  const intl = useIntl();
  const classes = useStyles();

  const configs = useMemo(
    () => [
      {
        label: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.LABEL' }),
        title: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.TITLE' }),
        description: intl.formatMessage({
          id: 'TALENT_LABS.TECHNOLOGIES.01.DESCRIPTION',
        }),
        src: '/static/images/talent-labs/people-01.png',
        srcSet: [
          '/static/images/talent-labs/people-01.png 500w',
          '/static/images/talent-labs/people-01@2x.png 2000w',
        ].join(', '),
        services: [
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.PROVIDE.01' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.PROVIDE.02' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.PROVIDE.03' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.01.PROVIDE.04' }),
        ],
      },
      {
        label: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.LABEL' }),
        title: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.TITLE' }),
        description: intl.formatMessage({
          id: 'TALENT_LABS.TECHNOLOGIES.02.DESCRIPTION',
        }),
        src: '/static/images/talent-labs/people-02.png',
        srcSet: [
          '/static/images/talent-labs/people-02.png 500w',
          '/static/images/talent-labs/people-02@2x.png 2000w',
        ].join(', '),
        services: [
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.PROVIDE.01' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.PROVIDE.02' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.PROVIDE.03' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.02.PROVIDE.04' }),
        ],
      },
      {
        label: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.LABEL' }),
        title: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.TITLE' }),
        description: intl.formatMessage({
          id: 'TALENT_LABS.TECHNOLOGIES.03.DESCRIPTION',
        }),
        src: '/static/images/talent-labs/people-03.png',
        srcSet: [
          '/static/images/talent-labs/people-03.png 500w',
          '/static/images/talent-labs/people-03@2x.png 2000w',
        ].join(', '),
        services: [
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.PROVIDE.01' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.PROVIDE.02' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.PROVIDE.03' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.03.PROVIDE.04' }),
        ],
      },
      {
        label: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.LABEL' }),
        title: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.TITLE' }),
        description: intl.formatMessage({
          id: 'TALENT_LABS.TECHNOLOGIES.04.DESCRIPTION',
        }),
        src: '/static/images/talent-labs/people-04.png',
        srcSet: [
          '/static/images/talent-labs/people-04.png 500w',
          '/static/images/talent-labs/people-04@2x.png 2000w',
        ].join(', '),
        services: [
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.PROVIDE.01' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.PROVIDE.02' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.PROVIDE.03' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.04.PROVIDE.04' }),
        ],
      },
      {
        label: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.LABEL' }),
        title: intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.TITLE' }),
        description: intl.formatMessage({
          id: 'TALENT_LABS.TECHNOLOGIES.05.DESCRIPTION',
        }),
        src: '/static/images/talent-labs/people-05.png',
        srcSet: [
          '/static/images/talent-labs/people-05.png 500w',
          '/static/images/talent-labs/people-05@2x.png 2000w',
        ].join(', '),
        services: [
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.PROVIDE.01' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.PROVIDE.02' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.PROVIDE.03' }),
          intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.05.PROVIDE.04' }),
        ],
      },
    ],
    [intl],
  );

  return (
    <div className={classes.root}>
      <Content className={classes.content}>
        <h2 className={classes.title} data-test="technologies-title">
          {intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.TITLE' })}
        </h2>
        <p className={classes.description} data-test="technologies-description">
          {intl.formatMessage({ id: 'TALENT_LABS.TECHNOLOGIES.DESCRIPTION' })}
        </p>
        {configs.map((item) => (
          <div className={classes.group} key={item.label}>
            <div className={classes.groupIntroduce}>
              <p className={classes.techLabel}>{item.label}</p>
              <div className={classes.techInfo}>
                <img
                  loading="lazy"
                  className={classes.techImage}
                  alt={item.label}
                  src={item.src}
                  srcSet={item.srcSet}
                />
                <div className={classes.techSummary}>
                  <h2 className={classes.techTitle}>{item.title}</h2>
                  <p className={classes.techDescription}>{item.description}</p>
                </div>
              </div>
            </div>
            <div className={classes.groupServices}>
              <p className={classes.serviceLabel}>
                {intl.formatMessage({
                  id: 'TALENT_LABS.TECHNOLOGIES.PROVIDE.LABEL',
                })}
              </p>
              {item.services.map((service) => (
                <p className={classes.serviceItem} key={service}>
                  {service}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Content>
    </div>
  );
};

export default memo(Technologies);
