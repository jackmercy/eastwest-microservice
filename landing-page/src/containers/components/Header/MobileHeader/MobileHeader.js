import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

// MVP hidden
// eslint-disable-next-line no-unused-vars
import { Logo, Button } from '../../../../components';
import { useEventListener } from '../../../../hooks';

import useStyles from './mobileHeader.styles';

const MobileHeader = () => {
  const intl = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const [activatedMenu, setActiveMenu] = useState(false);
  const [activeatedHeader, setActiveHeader] = useState(false);
  const products = useMemo(
    () => [
      {
        key: 'talent-labs',
        href: '/talent-labs',
        logo: 'talent-labs-black-no-text',
        name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.1.TITLE' }),
      },
      // MVP hidden
      // {
      //   key: 'art',
      //   href: '/art',
      //   logo: 'art-red-no-text',
      //   name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.2.TITLE' }),
      // },
      // {
      //   key: 'dashboard',
      //   href: '/dashboard',
      //   logo: 'dashboard-black-no-text',
      //   name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.3.TITLE' }),
      // },
      {
        key: 'data-labs',
        href: '/data-labs',
        logo: 'data-labs-red-no-text',
        name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.4.TITLE' }),
      },
    ],
    [intl],
  );
  const Products = useCallback(
    () => (
      <div className={classes.productMenu}>
        {products.map((item) => (
          <div className={classes.productItem} key={item.key}>
            <Logo
              href={item.href}
              alt={item.name}
              type={item.logo}
              className={classes.productLogo}
            />
            <Link href={item.href} passHref>
              <a href={item.href} className={classes.productName}>
                {item.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    ),
    [activatedMenu, products, classes],
  );

  useEffect(
    () => () => {
      const element = document.getElementsByTagName('body');
      if (element && activatedMenu) {
        element[0].style.overflow = !activatedMenu ? 'hidden' : null;
      }
    },
    [activatedMenu],
  );

  const handleItemMenuClick = (e) => {
    e.preventDefault();
  };

  const NavItem = useCallback(
    ({ href, label, active, dataTest, children, ...props }) => (
      <div className={classNames(classes.navItem, { active })}>
        <Link href={href} passHref>
          <a
            href={href}
            className={classes.navLink}
            data-test={dataTest}
            {...props}
          >
            {label}
          </a>
        </Link>
        {children}
      </div>
    ),
    [],
  );

  const configs = useMemo(
    () => [
      {
        key: 'products',
        component: NavItem,
        href: '/#',
        onClick: handleItemMenuClick,
        dataTest: 'header-url-products',
        label: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES' }),
        children: <Products />,
      },
      // MVP hidden
      // {
      //   key: 'pricing',
      //   component: NavItem,
      //   href: '/pricing',
      //   active: router.pathname === '/pricing',
      //   dataTest: 'header-url-pricing',
      //   label: intl.formatMessage({ id: 'HEADER.PRICING' }),
      // },
      {
        key: 'company',
        component: NavItem,
        href: '/company',
        active: router.pathname === '/company',
        dataTest: 'header-url-company',
        label: intl.formatMessage({ id: 'HEADER.COMPANY' }),
      },
      // MVP hidden
      // {
      //   key: 'support',
      //   component: NavItem,
      //   href: '/support',
      //   active: router.pathname === '/support',
      //   dataTest: 'header-url-support',
      //   label: intl.formatMessage({ id: 'HEADER.SUPPORT' }),
      // },
    ],
    [intl, router, classes, handleItemMenuClick],
  );

  useEventListener(
    'scroll',
    () => {
      if (!activatedMenu) {
        const top = window.pageYOffset || document.documentElement.scrollTop;
        setActiveHeader(top > 50);
      }
    },
    true,
  );

  const toggleMenu = () => {
    const element = document.getElementsByTagName('body');
    if (element) {
      element[0].style.overflow = !activatedMenu ? 'hidden' : null;
    }
    setActiveMenu(!activatedMenu);
  };

  return (
    <header
      className={classNames(classes.root, {
        active: activeatedHeader,
        showMenu: activatedMenu,
      })}
    >
      <div className={classes.main}>
        <Logo className={classes.logo} dataTest="header-logo" />
        <span
          role="presentation"
          onClick={toggleMenu}
          className={classes.toggleMenuButton}
        >
          <i className={!activatedMenu ? 'icon-hamberger' : 'icon-close'} />
        </span>
      </div>
      <div className={classNames(classes.menu, { active: activatedMenu })}>
        <div className={classNames('custom-scrollbar', classes.navbar)}>
          {configs.map(({ key, component: Component, ...restProps }) => (
            <Component key={key} {...restProps} />
          ))}
        </div>
        {/* MVP hidden */}
        {/* <div className={classes.footer}>
          <Button
            size="large"
            color="tertiary"
            className={classes.button}
            keepSizeOnMobile
            dataTest="header-url-sign-in"
          >
            {intl.formatMessage({ id: 'HEADER.SIGN_IN' })}
          </Button>
          <Button
            size="large"
            color="secondary"
            className={classes.button}
            keepSizeOnMobile
            dataTest="header-url-sign-up"
          >
            {intl.formatMessage({ id: 'HEADER.GET_STARTED' })}
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default memo(MobileHeader);
