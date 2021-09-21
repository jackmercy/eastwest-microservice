import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
    overflow: 'hidden',
  },
  contentLayout: { position: 'relative', height: '100%' },
  content: {
    top: '58%',
    right: 0,
    maxWidth: rem(700),
    transform: 'translateY(-50%)',
    position: 'absolute',
    borderRadius: rem(12),
    color: COLORS.textWhite,
    padding: [rem(40), rem(32), rem(48)],
    boxSizing: 'border-box',
    transition: 'padding .5s ease, left .5s ease, max-width .5s ease .3s',
    backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.75),
  },
  logo: { maxWidth: '100%' },
  purpose: {
    fontWeight: 900,
    fontSize: rem(24),
    fontStyle: 'italic',
    textAlign: 'right',
    lineHeight: rem(32),
    margin: 0,
    transition: 'font-size .5s ease',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },
  buttonGroup: { marginTop: rem(32) },
  button: {
    padding: [0, rem(32)],
    '& + $button': { marginLeft: rem(24) },
    '&.tertiary': {
      color: COLORS.textWhite,
      '&:not(.disabled):hover': { color: COLORS.primary },
      '& > [class^=icon-]': { fontSize: rem(10), marginLeft: rem(16) },
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    content: {
      maxWidth: '100%',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    purpose: { fontSize: rem(14), lineHeight: rem(16) },
    content: { padding: [rem(24), rem(16), rem(30)] },
    description: { fontSize: rem(16), lineHeight: rem(24), marginTop: rem(16) },
    buttonGroup: { marginTop: rem(24) },
    button: {
      display: 'flex',
      margin: [0, 'auto'],
      '& + $button': { margin: [rem(24), 'auto', 0] },
    },
  },
});
