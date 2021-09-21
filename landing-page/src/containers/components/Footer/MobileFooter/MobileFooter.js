import React, { memo, useMemo, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import {
  Register,
  CopyRight,
  SummaryInfo,
  SectionTitle,
  SwitchLanguages,
} from '../components';

import useStyles from './mobileFooter.styles';

const MobileFooter = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [activatedIndex, setActiveIndex] = useState(-1);
  const configs = useMemo(
    () => [
      {
        key: 'product',
        title: intl.formatMessage({ id: 'FOOTER.PRODUCTS.TITLE' }),
        dataTest: 'footer-product',
        menu: [
          {
            key: 'talent-labs',
            href: '/talent-labs',
            label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.TALENT_LABS' }),
          },
          // MVP hidden
          // {
          //   key: 'dashboard',
          //   href: '/dashboard',
          //   label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.DASHBOARD' }),
          // },
          // {
          //   key: 'art',
          //   href: '/art',
          //   label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.ART' }),
          // },
          // {
          //   key: 'admin',
          //   href: '/admin',
          //   label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.ADMIN' }),
          // },
          // {
          //   key: 'rmt',
          //   href: '/rmt',
          //   label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.RMT' }),
          // },
          {
            key: 'data-labs',
            href: '/data-labs',
            label: intl.formatMessage({ id: 'FOOTER.PRODUCTS.DATA_LABS' }),
          },
        ],
      },
      {
        key: 'company',
        title: intl.formatMessage({ id: 'FOOTER.COMPANY.TITLE' }),
        dataTest: 'footer-page',
        menu: [
          {
            key: 'about-us',
            href: '/company',
            label: intl.formatMessage({ id: 'FOOTER.COMPANY.ABOUT_US' }),
          },
          {
            key: 'careers',
            href: '/careers',
            label: intl.formatMessage({ id: 'FOOTER.COMPANY.CAREERS' }),
          },
          {
            key: 'contact',
            href: '/contact',
            label: intl.formatMessage({ id: 'FOOTER.COMPANY.CONTACT_US' }),
          },
        ],
      },
      {
        key: 'learn',
        title: intl.formatMessage({ id: 'FOOTER.LEARN.TITLE' }),
        dataTest: 'footer-other',
        menu: [
          {
            key: 'news',
            href: '/news-and-media',
            label: intl.formatMessage({ id: 'FOOTER.LEARN.NEWS' }),
          },
          // MVP hidden
          // {
          //   key: 'support',
          //   href: '/support',
          //   label: intl.formatMessage({ id: 'FOOTER.LEARN.SUPPORT' }),
          // },
          // {
          //   key: 'newsletter',
          //   href: '/newsletter',
          //   label: intl.formatMessage({ id: 'FOOTER.LEARN.NEWSLETTER' }),
          // },
        ],
      },
    ],
    [intl],
  );

  const handleItemClick = (index) => {
    setActiveIndex(index !== activatedIndex ? index : -1);
  };

  return (
    <footer className={classes.root}>
      <SummaryInfo />
      {configs.map(({ key: parentKey, title, dataTest, menu }, index) => (
        <div key={parentKey} className={classes.dropdown}>
          <div
            role="presentation"
            className={classes.toggleButton}
            onClick={() => handleItemClick(index)}
          >
            <SectionTitle title={title} />
            <i
              className={
                index === activatedIndex ? 'icon-caret-up' : 'icon-caret-down'
              }
            />
          </div>
          <ul
            className={classNames(classes.menu, {
              active: index === activatedIndex,
            })}
          >
            {menu.map(({ key, label, href, ...restProps }) => (
              <li key={`${parentKey}-${key}`} className={classes.menuItem}>
                <Link key={`${parentKey}-${key}`} href={href} passHref>
                  <a
                    href="/#"
                    className={classes.menuLink}
                    data-test={dataTest}
                    {...restProps}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Register />
      <SwitchLanguages />
      <CopyRight />
    </footer>
  );
};

export default memo(MobileFooter);
