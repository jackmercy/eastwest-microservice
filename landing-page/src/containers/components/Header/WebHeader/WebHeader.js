import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

// eslint-disable-next-line no-unused-vars
import { Logo, Button } from '../../../../components';
import { useEventListener } from '../../../../hooks';

import useStyles from './webHeader.styles';

const WebHeader = () => {
  const intl = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const [activatedMenu, setActiveMenu] = useState(-1);
  const [activeatedHeader, setActiveHeader] = useState(false);
  const products = useMemo(
    () => [
      {
        key: 'talent-labs',
        href: '/talent-labs',
        logo: 'talent-labs-black-no-text',
        name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.1.TITLE' }),
        description: intl.formatMessage({
          id: 'HEADER.PRODUCTS_SERVICES.1.DESCRIPTION',
        }),
      },
      // MVP hidden
      // {
      //   key: 'art',
      //   href: '/art',
      //   logo: 'art-red-no-text',
      //   name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.2.TITLE' }),
      //   description: intl.formatMessage({
      //     id: 'HEADER.PRODUCTS_SERVICES.2.DESCRIPTION',
      //   }),
      // },
      // {
      //   key: 'dashboard',
      //   href: '/dashboard',
      //   logo: 'dashboard-black-no-text',
      //   name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.3.TITLE' }),
      //   description: intl.formatMessage({
      //     id: 'HEADER.PRODUCTS_SERVICES.3.DESCRIPTION',
      //   }),
      // },
      {
        key: 'data-labs',
        href: '/data-labs',
        logo: 'data-labs-red-no-text',
        name: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES.4.TITLE' }),
        description: intl.formatMessage({
          id: 'HEADER.PRODUCTS_SERVICES.4.DESCRIPTION',
        }),
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
            <div>
              <Link href={item.href} passHref>
                <a href={item.href} className={classes.productName}>
                  {item.name}
                </a>
              </Link>
              <p className={classes.productDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    [activatedMenu, products, classes],
  );

  const handleItemMenuClick = (e) => {
    e.preventDefault();
  };

  const handleItemMenuMouseEnter = (index) => {
    if (index === activatedMenu) {
      return;
    }
    setActiveMenu(index);
  };

  const handleResetMenu = useCallback(() => {
    setActiveMenu(-1);
  }, []);

  const NavItem = useCallback(
    ({ href, label, isMenu, active, dataTest, ...props }) => (
      <Link href={href} passHref>
        <a
          href={href}
          className={classNames(classes.navItem, { active })}
          data-test={dataTest}
          {...props}
        >
          {label}
          {isMenu ? <i className="icon-caret-down" /> : null}
        </a>
      </Link>
    ),
    [],
  );

  const configs = useMemo(
    () => [
      {
        key: 'logo',
        component: Logo,
        width: 206,
        height: 39,
        className: classes.logo,
        dataTest: 'header-logo',
        onMouseEnter: handleResetMenu,
      },
      {
        key: 'products',
        component: NavItem,
        href: '/#',
        isMenu: true,
        active: activatedMenu === 1,
        onClick: handleItemMenuClick,
        onMouseEnter: () => handleItemMenuMouseEnter(1),
        dataTest: 'header-url-products',
        label: intl.formatMessage({ id: 'HEADER.PRODUCTS_SERVICES' }),
      },
      // MVP hidden
      // {
      //   key: 'pricing',
      //   component: NavItem,
      //   href: '/pricing',
      //   active: router.pathname === '/pricing',
      //   onMouseEnter: handleResetMenu,
      //   dataTest: 'header-url-pricing',
      //   label: intl.formatMessage({ id: 'HEADER.PRICING' }),
      // },
      {
        key: 'company',
        component: NavItem,
        href: '/company',
        active: router.pathname === '/company',
        onMouseEnter: handleResetMenu,
        dataTest: 'header-url-company',
        label: intl.formatMessage({ id: 'HEADER.COMPANY' }),
      },
      // MVP hidden
      // {
      //   key: 'support',
      //   component: NavItem,
      //   href: '/support',
      //   active: router.pathname === '/support',
      //   onMouseEnter: handleResetMenu,
      //   dataTest: 'header-url-support',
      //   label: intl.formatMessage({ id: 'HEADER.SUPPORT' }),
      // },
      // {
      //   key: 'sign-in',
      //   component: Button,
      //   size: 'large',
      //   color: 'tertiary',
      //   className: classes.button,
      //   onMouseEnter: handleResetMenu,
      //   dataTest: 'header-url-sign-in',
      //   children: intl.formatMessage({ id: 'HEADER.SIGN_IN' }),
      // },
      // {
      //   key: 'sign-up',
      //   component: Button,
      //   size: 'large',
      //   color: 'secondary',
      //   className: classes.button,
      //   onMouseEnter: handleResetMenu,
      //   dataTest: 'header-url-sign-up',
      //   children: intl.formatMessage({ id: 'HEADER.GET_STARTED' }),
      // },
    ],
    [
      intl,
      router,
      classes,
      handleResetMenu,
      handleItemMenuClick,
      handleItemMenuMouseEnter,
    ],
  );

  useEventListener(
    'scroll',
    () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setActiveHeader(top > 50);
    },
    true,
  );

  return (
    <header
      className={classNames(classes.root, {
        active: activeatedHeader,
        activeMenu: activatedMenu !== -1,
      })}
      onMouseLeave={handleResetMenu}
    >
      <div className={classes.main}>
        {configs.map(({ key, component: Component, ...restProps }) => (
          <Component key={key} {...restProps} />
        ))}
      </div>
      <div
        className={classNames(classes.menu, {
          active: activatedMenu !== -1,
        })}
      >
        {activatedMenu === 1 ? <Products /> : null}
      </div>
    </header>
  );
};

export default memo(WebHeader);
