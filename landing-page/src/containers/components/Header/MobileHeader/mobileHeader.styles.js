import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    top: 0,
    zIndex: 99,
    width: '100%',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: COLORS.bgWhite,
    padding: [0, rem(16)],
    transition: 'padding .3s ease, min-height .5s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    '&.active': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)' },
    '&.showMenu': {
      minHeight: '100vh',
      height: '100%',
      overflow: 'hidden',
    },
  },
  main: {
    zIndex: 2,
    flex: 'none',
    width: '100%',
    display: 'flex',
    padding: [rem(16), 0],
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 'none',
    marginRight: rem(80),
    maxWidth: rem(206),
    transition: 'margin .3s ease, max-width .5s ease',
  },
  toggleMenuButton: { fontSize: rem(28), cursor: 'pointer' },
  menu: {
    maxHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    margin: [0, rem(-16)],
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    transition: 'max-height .5s ease',
    '&.active': { maxHeight: '100vh' },
  },
  navbar: {
    padding: 0,
    height: '100%',
    flex: '1 1 auto',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBottom: rem(50),
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderTop: `1px solid ${COLORS.borderGray01}`,
  },
  navItem: {
    flex: 'none',
    padding: [0, rem(16)],
    borderBottom: `1px solid ${COLORS.borderGray01}`,
    '&.active': { borderBottom: `${rem(2)} solid ${COLORS.primary}` },
  },
  navLink: {
    padding: [rem(16), 0],
    display: 'block',
    textDecoration: 'none',
    color: COLORS.textBlack01,
    fontWeight: 600,
    fontSize: rem(16),
    lineHeight: rem(24),
  },
  footer: {
    flex: 'none',
    padding: [rem(16), rem(32)],
    textAlign: 'right',
    margin: [0, rem(-16)],
    backgroundColor: COLORS.bgGray02,
  },
  button: {
    '&.tertiary': {
      color: COLORS.primary,
      marginRight: rem(16),
    },
    '&.secondary': { backgroundColor: 'transparent' },
  },
  productMenu: { paddingBottom: rem(24) },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    '& + $productItem': { marginTop: rem(32) },
  },
  productLogo: {
    flex: 'none',
    width: rem(48),
    height: rem(48),
    marginRight: rem(32),
  },
  productName: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(32),
    lineHeight: rem(48),
    textDecoration: 'none',
    color: COLORS.textBlack01,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    logo: { marginRight: rem(40), maxWidth: rem(126) },
    toggleMenuButton: { fontSize: rem(16) },
  },
});
