import Link from 'next/link';
import { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Content } from '../../../components';

import useStyles from './successful.styles';

const Successful = ({ onBack }) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Content className={classes.root}>
      <Link href="/careers" passHref>
        <a
          href="/careers"
          className={classes.link}
          data-test="successful-more-button"
        >
          <span>
            {intl.formatMessage(
              { id: 'VACANCY.SUCCESS.MORE_OPPORTURNITIES' },
              {
                span: (...chunks) => (
                  <span className={classes.textBlack}>{chunks.join('')}</span>
                ),
              },
            )}
          </span>
          <i className="icon-arrow-right" />
        </a>
      </Link>
      <h2 className={classes.title} data-test="successful-title">
        {intl.formatMessage({ id: 'VACANCY.SUCCESS.TITLE' })}
      </h2>
      <p className={classes.description} data-test="successful-description">
        {intl.formatMessage({ id: 'VACANCY.SUCCESS.DESCRIPTION' })}
      </p>
      <button
        className={classes.backButton}
        onClick={onBack}
        data-test="successful-back-button"
      >
        <i className="icon-arrow-left" />
        <span>
          {intl.formatMessage({ id: 'VACANCY.SUCCESS.BACK_TO_APPLICATION' })}
        </span>
      </button>
    </Content>
  );
};
Successful.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default memo(Successful);
