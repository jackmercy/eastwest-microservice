import { createUseStyles } from 'react-jss';

import { rem } from '../../../../../utils/jss';
import COLORS from '../../../../../constants/COLORS';
import BREAKPOINTS from '../../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {},
  content: { marginTop: rem(8), position: 'relative' },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: rem(16),
    lineHeight: rem(24),
    color: COLORS.textWhite,
    '&:hover [class^=icon]:last-child': { color: COLORS.primary },
    '& [class^=icon]': {
      color: COLORS.textWhite,
      '&:first-child': { fontSize: rem(24), marginRight: rem(8) },
      '&:last-child': { fontSize: rem(7), marginLeft: rem(8) },
    },
  },
  menu: {
    minWidth: rem(180),
    margin: 0,
    zIndex: 999,
    display: 'block',
    position: 'absolute',
    backgroundColor: COLORS.bgWhite,
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: rem(5),
    padding: [rem(8), 0],
    left: 0,
    top: rem(30),
    listStyleType: 'none',
  },
  menuItem: {
    whiteSpace: 'nowrap',
    padding: [rem(8), rem(16)],
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(211, 211, 211, 0.2)',
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginTop: rem(32) },
  },
});
