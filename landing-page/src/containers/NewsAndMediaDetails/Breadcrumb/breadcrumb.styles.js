import { createUseStyles } from 'react-jss';

import COLORS from '../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    marginBottom: rem(40),
    backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.05),
  },
  content: {
    paddingTop: rem(4),
    paddingBottom: rem(4),
    fontWeight: 600,
    maxWidth: rem(1270),
    fontSize: rem(12),
    lineHeight: rem(16),
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: COLORS.textBlack01,
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    '&:hover': { color: COLORS.primary },
  },
  arrow: {
    display: 'inline-block',
    margin: [0, rem(10), 0, rem(8)],
    '& > [class^=icon-]': { fontSize: rem(8) },
  },
  subLink: { fontWeight: 400, color: COLORS.textGray, whiteSpace: 'nowrap' },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { display: 'none' },
  },
});
