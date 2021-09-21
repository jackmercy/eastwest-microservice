import Link from 'next/link';
import React, { memo, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './copyRight.styles';

const CopyRight = () => {
  const intl = useIntl();
  const classes = useStyles();
  const Item = useCallback(
    ({ href, label, dataTest, ...props }) => (
      <Link href={href} passHref>
        <a href={href} className={classes.item} data-test={dataTest} {...props}>
          {label}
        </a>
      </Link>
    ),
    [],
  );
  const configs = useMemo(
    () => [
      {
        key: 'copyright',
        component: 'p',
        className: classes.item,
        'data-test': 'copy-right-license',
        children: intl.formatMessage({ id: 'FOOTER.COPYRIGHT.LICENSE' }),
      },
      {
        key: 'term-of-use',
        component: Item,
        href: '/terms',
        target: '_blank',
        dataTest: 'copy-right-url-terms',
        label: intl.formatMessage({ id: 'FOOTER.COPYRIGHT.TERMS' }),
      },
      {
        key: 'privacy-policy',
        component: Item,
        href: '/privacy',
        target: '_blank',
        dataTest: 'copy-right-url-privacy',
        label: intl.formatMessage({ id: 'FOOTER.COPYRIGHT.PRIVACY_POLICY' }),
      },
      {
        key: 'cookie-statement',
        component: Item,
        href: '/cookies',
        target: '_blank',
        dataTest: 'copy-right-url-cookie-statement',
        label: intl.formatMessage({ id: 'FOOTER.COPYRIGHT.COOKIE_STATEMENT' }),
      },
      {
        key: 'legal',
        component: Item,
        href: '/terms',
        target: '_blank',
        dataTest: 'copy-right-url-legal',
        label: intl.formatMessage({ id: 'FOOTER.COPYRIGHT.LEGAL' }),
      },
    ],
    [intl, classes],
  );

  return (
    <div className={classes.root}>
      {configs.map(({ key, component: Component, ...restProps }) => (
        <Component key={key} {...restProps} />
      ))}
    </div>
  );
};

export default memo(CopyRight);
