import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  Register,
  CopyRight,
  SummaryInfo,
  SectionTitle,
  SwitchLanguages,
} from '../components';

import Content from '../../Content';
import useStyles from './webFooter.styles';

const WebFooter = () => {
  const intl = useIntl();
  const classes = useStyles();
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

  return (
    <footer className={classes.footer}>
      <Content>
        <div className={classes.content}>
          <SummaryInfo />
          {configs.map(({ key: parentKey, title, menu, dataTest }) => (
            <div key={parentKey} className={classes.group}>
              <SectionTitle title={title} className={classes.groupTitle} />
              {menu.map(({ key, label, href, ...restProps }) => (
                <Link key={`${parentKey}-${key}`} href={href} passHref>
                  <a
                    href="/#"
                    className={classes.groupItem}
                    data-test={dataTest}
                    {...restProps}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          ))}

          <div>
            <SwitchLanguages />
            <Register />
          </div>
        </div>
        <CopyRight />
      </Content>
    </footer>
  );
};

export default memo(WebFooter);
