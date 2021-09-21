import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';
import COLORS from '../../../constants/COLORS';

export default createUseStyles({
  root: {},
  paginationContainer: {
    listStyle: 'none',
    margin: [rem(80), 0, 0],
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationButton: { margin: [0, rem(4)] },
  paginationLink: {
    fontWeight: 500,
    fontSize: rem(16),
    lineHeight: rem(24),
    cursor: 'pointer',
    padding: [0, rem(8)],
    display: 'block',
    borderRadius: rem(2),
    color: COLORS.textBlack01,
    textDecoration: 'none',
    border: `1px solid ${COLORS.primary}`,
    '&:hover': {
      fontWeight: 600,
      color: COLORS.textWhite,
      backgroundColor: COLORS.primary,
    },
  },
  paginationActiveLink: {
    fontWeight: 600,
    color: COLORS.textWhite,
    backgroundColor: COLORS.primary,
  },
  empty: { textAlign: 'center', fontSize: rem(16), lineHeight: rem(24) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    pagination: { marginTop: rem(32) },
  },
});
