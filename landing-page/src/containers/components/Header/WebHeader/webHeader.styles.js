import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    top: 0,
    zIndex: 99,
    width: '100%',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: COLORS.bgWhite,
    padding: [rem(32), rem(40)],
    transition: 'padding .3s ease',
    '&.active': {
      paddingTop: rem(24),
      paddingBottom: rem(24),
      backgroundColor: hexToRgbA(COLORS.bgWhite, 0.95),
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    },
    '&.activeMenu': {
      background:
        // eslint-disable-next-line max-len
        'linear-gradient(2.39deg, #FFFFFF 82.5%, rgba(255, 255, 255, 0.95) 97.56%)',
    },
  },
  main: {
    zIndex: 2,
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 'none',
    marginRight: rem(80),
    maxWidth: rem(206),
    transition: 'margin .3s ease',
  },
  navItem: {
    flex: 'none',
    textDecoration: 'none',
    color: COLORS.textBlack01,
    fontWeight: 600,
    fontSize: rem(16),
    lineHeight: rem(24),
    marginRight: rem(40),
    position: 'relative',
    transition: 'margin .3s ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      left: 0,
      bottom: rem(-10),
      backgroundColor: COLORS.primary,
      transition: 'width .5s ease',
      borderRadius: rem(4),
      height: rem(2),
    },
    '&:hover': {
      color: COLORS.primary,
      '&::after': { width: '100%' },
    },
    '& > [class^=icon-]': {
      display: 'inline-block',
      color: COLORS.primary,
      marginLeft: rem(8),
      fontSize: rem(8),
      transition: 'transform .5s ease',
    },
    '&.active': {
      '&::after': { width: '100%' },
      '& > [class^=icon-]': { transform: 'rotate(-180deg)' },
    },
  },
  button: {
    '&.tertiary': {
      flex: '1 1 auto',
      justifyContent: 'flex-end',
      color: COLORS.primary,
      marginRight: rem(16),
    },
    '&.secondary': { backgroundColor: 'transparent' },
  },
  menu: {
    zIndex: 1,
    position: 'relative',
    width: '100%',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    maxHeight: 0,
    overflow: 'hidden',
    padding: [0, rem(100), 0, rem(286)], // 286 = width logo + margin right logo
    transition: 'max-height .5s ease, padding .35s ease',
    '&.active': {
      paddingTop: rem(70),
      paddingBottom: rem(70),
      maxHeight: '100vh',
    },
  },
  productMenu: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: [rem(-20), rem(-60)],
    transition: 'margin .5s ease',
  },
  productItem: {
    flex: '50%',
    maxWidth: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    padding: [rem(20), rem(60)],
    transition: 'padding .5s ease',
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
    color: COLORS.bgBlack01,
    textDecoration: 'none',
    '&:hover': { color: COLORS.primary },
  },
  productDescription: {
    fontWeight: 600,
    fontSize: rem(16),
    lineHeight: rem(24),
    maxWidth: rem(582),
    color: hexToRgbA(COLORS.textBlack01, 0.5),
    marginTop: rem(4),
    marginBottom: 0,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    logo: { marginRight: rem(48) },
    navItem: { marginRight: rem(32) },
    menu: { padding: [0, rem(48)] },
    productMenu: { margin: [rem(-16), rem(-24)] },
    productItem: { padding: [rem(16), rem(24)] },
  },
});
