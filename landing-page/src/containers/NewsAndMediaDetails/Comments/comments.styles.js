import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {},
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${COLORS.borderGray01}`,
    paddingTop: rem(32),
    paddingBottom: rem(32),
  },
  title: {
    fontWeight: 900,
    fontSize: rem(24),
    lineHeight: rem(32),
    margin: 0,
  },
  filterButton: {
    marginLeft: rem(32),
    minWidth: rem(124),
    position: 'relative',
    overflow: 'visible',
    '&.primary:not(.disabled):hover': { opacity: 1 },
    '&:not(.show)': {
      boxShadow: 'none',
      color: COLORS.textBlack01,
      backgroundColor: 'transparent',
    },
    '& > [class^=icon-]': { fontSize: rem(16), marginRight: rem(12) },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {},
    titleGroup: {
      justifyContent: 'space-between',
      border: 'none',
      paddingTop: 0,
      paddingBottom: rem(24),
    },
    title: { fontSize: rem(18) },
  },
});
