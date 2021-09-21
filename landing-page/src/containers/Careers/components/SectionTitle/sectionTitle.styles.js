import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  primary: { color: COLORS.primary },
  title: {
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    cursor: 'pointer',
    marginTop: 0,
    marginBottom: rem(24),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    title: {
      textAlign: 'center',
      fontSize: rem(40),
      lineHeight: rem(48),
    },
  },
});
