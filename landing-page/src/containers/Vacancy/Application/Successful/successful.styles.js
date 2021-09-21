import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';
import COLORS from '../../../../constants/COLORS';

export default createUseStyles({
  root: {
    maxWidth: rem(837),
    paddingTop: rem(64),
    paddingBottom: rem(334),
  },
  title: {
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    marginTop: rem(64),
    marginBottom: rem(32),
  },
  description: {
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: 0,
    marginBottom: rem(64),
  },
  link: {
    color: COLORS.primary,
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    display: 'block',
    textAlign: 'right',
    '&:hover': { opacity: 0.85 },
    '& > [class^=icon-]': { marginLeft: rem(8), fontSize: rem(16) },
  },
  backButton: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    color: COLORS.primary,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '&:hover': { opacity: 0.85 },
    '& > [class^=icon-]': { marginRight: rem(16), fontSize: rem(16) },
  },
  textBlack: { color: COLORS.textBlack01 },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(24), paddingBottom: rem(80) },
    title: {
      textAlign: 'center',
      fontSize: rem(32),
      lineHeight: rem(40),
      marginTop: rem(48),
      marginBottom: rem(16),
      letterSpacing: '0.01em',
    },
    description: {
      textAlign: 'center',
      fontSize: rem(14),
      lineHeight: rem(20),
      marginBottom: rem(48),
    },
    link: {
      fontSize: rem(14),
      lineHeight: rem(20),
      '& > [class^=icon-]': { fontSize: rem(8) },
    },
    backButton: {
      fontSize: rem(14),
      lineHeight: rem(20),
      '& > [class^=icon-]': { marginRight: rem(8), fontSize: rem(8) },
    },
  },
});
