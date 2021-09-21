import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: rem(16),
    fontWeight: 400,
    lineHeight: rem(24),
    marginTop: rem(12),
    marginBottom: 0,
    color: COLORS.textRed,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginTop: rem(6), fontSize: rem(14), lineHeight: rem(20) },
  },
});
