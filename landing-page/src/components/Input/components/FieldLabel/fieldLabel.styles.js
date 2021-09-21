import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'inline-block',
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    color: hexToRgbA(COLORS.textBlack01, 0.8),
    marginBottom: rem(8),
    fontFamily: 'inherit',
    '&.required::after': {
      fontSize: 'inherit',
      content: '" *"',
      color: '#C80030',
      verticalAlign: 'top',
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginBottom: rem(4) },
  },
});
