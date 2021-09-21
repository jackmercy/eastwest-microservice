import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    flex: 'none',
    position: 'relative',
    backgroundColor: 'inherit',
    padding: rem(32),
    transition: 'padding .5s ease',
    borderRadius: [rem(8), rem(8), 0, 0],
    borderBottom: `1px solid ${COLORS.borderGray01}`,
  },
  title: {
    fontWeight: 600,
    fontSize: rem(32),
    lineHeight: rem(32),
    textAlign: 'center',
    transition: 'font-size .5s ease',
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    top: rem(16),
    right: rem(16),
    fontSize: rem(16),
    display: 'flex',
    cursor: 'pointer',
    transition: 'font-size .5s ease',
    '&:hover': { color: COLORS.primary },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { padding: rem(16) },
    title: { fontSize: rem(16), lineHeight: rem(24), marginTop: rem(8) },
  },
});
