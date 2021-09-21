import { createUseStyles } from 'react-jss';

import COLORS from '../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundImage: 'url(/static/images/homepage/teaser-01.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    overflow: 'hidden',
  },
  contentLayout: { position: 'relative', height: '100%' },
  content: {
    top: '58%',
    left: 0,
    maxWidth: rem(744),
    transform: 'translateY(-50%)',
    position: 'absolute',
    borderRadius: rem(12),
    color: COLORS.textWhite,
    padding: [rem(64), rem(32)],
    boxSizing: 'border-box',
    transition: 'padding .5s ease, left .5s ease, max-width .5s ease .3s',
    backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.45),
  },
  title: {
    fontWeight: 900,
    fontSize: rem(72),
    maxWidth: rem(659),
    lineHeight: rem(88),
    margin: 0,
    transition: 'font-size .5s ease',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(40),
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },
  buttonGroup: { marginTop: rem(48) },
  button: {
    padding: [0, rem(32)],
    '& + $button': { marginLeft: rem(24) },
    '&.tertiary': {
      color: COLORS.primary,
      '& > [class^=icon-]': { fontSize: rem(16), marginLeft: rem(16) },
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
    root: {
      backgroundImage: 'url(/static/images/homepage/teaser-01-mobile.png)',
    },
    title: { fontSize: rem(40), lineHeight: rem(48) },
    content: { padding: [rem(32), rem(12)], textAlign: 'center' },
    description: { fontSize: rem(16), lineHeight: rem(28), marginTop: rem(16) },
    buttonGroup: { marginTop: rem(16) },
    button: {
      display: 'flex',
      margin: [0, 'auto'],
      '& + $button': { margin: [rem(24), 'auto', 0] },
    },
  },
});
