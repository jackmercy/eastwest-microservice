import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  tabWrapper: {
    borderBottom: `1px solid ${COLORS.borderGray01}`,
  },
  tab: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
  },
  tabItem: {
    fontWeight: 600,
    fontSize: rem(18),
    lineHeight: rem(40),
    padding: [rem(24), rem(10.5)],
    position: 'relative',
    cursor: 'pointer',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      left: 0,
      bottom: -1,
      height: rem(2),
      borderRadius: rem(2),
      backgroundColor: COLORS.primary,
      transition: 'width .3s ease',
    },
    '&.active::after': { width: '100%' },
    '&:hover': { color: COLORS.primary, '&::after': { width: '100%' } },
    '& + $tabItem': { marginLeft: rem(48) },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    tabItem: {
      fontSize: rem(16),
      lineHeight: rem(24),
      padding: [rem(16), rem(11)],
      '& + $tabItem': { marginLeft: rem(32) },
    },
  },
});
