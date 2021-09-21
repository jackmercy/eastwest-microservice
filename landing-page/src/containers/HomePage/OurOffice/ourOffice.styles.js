import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    overflow: 'hidden',
    maxWidth: rem(1192),
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },
  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    transition: 'font-size .5s ease',
    marginTop: 0,
    marginBottom: rem(80),
  },
  introTitle: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: rem(48),
    lineHeight: rem(64),
    marginTop: rem(48),
    marginBottom: 0,
    transition: 'font-size .5s ease, margin .5s ease',
  },
  introDescription: {
    fontSize: rem(32),
    lineHeight: rem(48),
    marginTop: rem(32),
    marginBottom: 0,
    transition: 'font-size .5s ease, margin .5s ease',
  },
  introLink: {
    display: 'inline-block',
    textDecoration: 'none',
    color: COLORS.primary,
    '& > [class^=icon-]': {
      fontSize: rem(11.5),
      verticalAlign: 'middle',
      marginLeft: rem(16),
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(48), paddingBottom: rem(48) },
    title: { fontSize: rem(32), lineHeight: rem(40), marginBottom: rem(32) },
    introTitle: {
      fontSize: rem(24),
      lineHeight: rem(32),
      marginTop: rem(32),
      marginBottom: 0,
    },
    introDescription: {
      fontSize: rem(16),
      lineHeight: rem(24),
      marginTop: rem(16),
    },
  },
});
