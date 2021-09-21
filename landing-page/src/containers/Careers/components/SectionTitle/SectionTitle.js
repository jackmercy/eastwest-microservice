import Link from 'next/link';
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { scrollToElement } from '../../../../utils';

import useStyles from './sectionTitle.styles';

const SectionTitle = ({ id, translateId, className }) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleScrollToId = useCallback((e) => {
    e.preventDefault();
    window.history.pushState({}, '', `/careers#${id}`);
    scrollToElement(id);
  }, []);

  return (
    <Link href={`/careers#${id}`}>
      <h2
        id={id}
        role="presentation"
        className={classNames(classes.title, className)}
        onClick={handleScrollToId}
      >
        {intl.formatMessage(
          { id: translateId },
          {
            span: (...chunks) => (
              <span className={classes.primary}>{chunks.join('')}</span>
            ),
          },
        )}
      </h2>
    </Link>
  );
};
SectionTitle.propTypes = {
  id: PropTypes.string.isRequired,
  translateId: PropTypes.string.isRequired,
  className: PropTypes.string,
};
SectionTitle.defaultProps = { className: '' };

export default memo(SectionTitle);
