import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DEFAULT_SEO } from '../../../configs';

import useStyles from './logo.styles';

const Logo = ({ alt, href, type, className, dataTest, ...restProps }) => {
  const classes = useStyles();

  const imageSrc = useMemo(() => {
    switch (type) {
      case 'east-west':
        return '/static/images/logo/east-west.svg';
      case 'east-west-white':
        return '/static/images/logo/east-west-white.svg';
      case 'east-west-no-text':
        return '/static/images/logo/east-west-no-text.svg';
      case 'talent-labs':
        return '/static/images/logo/talent-labs.svg';
      case 'talent-labs-black-no-text':
        return '/static/images/logo/talent-labs-black-no-text.svg';
      case 'dashboard-black-no-text':
        return '/static/images/logo/dashboard-black-no-text.svg';
      case 'art-red-no-text':
        return '/static/images/logo/art-red-no-text.svg';
      case 'data-labs':
        return '/static/images/logo/data-labs.svg';
      case 'data-labs-no-text':
        return '/static/images/logo/data-labs-no-text.svg';
      case 'data-labs-red-no-text':
        return '/static/images/logo/data-labs-red-no-text.svg';
      default:
        return null;
    }
  }, [type]);

  return (
    <Link href={href} passHref>
      <a
        href={href}
        className={classNames(classes.root, className)}
        data-test={dataTest || 'component-logo-root'}
        {...restProps}
      >
        <img
          alt={alt || DEFAULT_SEO.TITLE}
          src={imageSrc}
          loading="lazy"
          className={classes.image}
          data-test="component-logo-image"
        />
      </a>
    </Link>
  );
};
Logo.propTypes = {
  href: PropTypes.string,
  alt: PropTypes.string,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'east-west',
    'east-west-white',
    'east-west-no-text',
    'talent-labs',
    'talent-labs-black-no-text',
    'dashboard-black-no-text',
    'art-red-no-text',
    'data-labs',
    'data-labs-no-text',
    'data-labs-red-no-text',
  ]),
};
Logo.defaultProps = {
  alt: '',
  href: '/',
  dataTest: '',
  className: '',
  type: 'east-west',
};

export default memo(Logo);
