import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundImage: 'url(/static/images/vacancy/teaser.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  },
  content: {
    paddingTop: rem(68),
    paddingBottom: rem(68),
    color: COLORS.textWhite,
  },
  title: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
  },
  subTitle: {
    fontWeight: 400,
    fontSize: rem(24),
    lineHeight: rem(40),
    margin: 0,
  },
  breadcrumb: {
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    marginTop: rem(16),
  },
  link: {
    textDecoration: 'none',
    color: COLORS.textWhite,
    '&:hover': { color: COLORS.primary },
  },
  arrow: {
    display: 'inline-block',
    margin: [0, rem(10), 0, rem(16)],
    '& > [class^=icon-]': { fontSize: rem(8) },
  },
  subLink: { fontWeight: 600, color: COLORS.textGray },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingTop: rem(32), paddingBottom: rem(32) },
    title: { fontSize: rem(24), lineHeight: rem(32) },
    subTitle: {
      fontWeight: 600,
      fontSize: rem(12),
      lineHeight: rem(16),
      marginTop: rem(8),
    },
    breadcrumb: { fontSize: rem(11) },
  },
});
