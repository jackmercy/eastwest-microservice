import { createUseStyles } from 'react-jss';

import COLORS from '../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${hexToRgbA(COLORS.borderGray02, 0.5)}`,
    borderRadius: rem(4),
    backgroundColor: COLORS.bgWhite,
    '&.suffix': {
      flexDirection: 'row-reverse',
      '& > $unit': { paddingLeft: 0, paddingRight: rem(16) },
    },
    '&.disabled': {
      cursor: 'not-allowed',
      color: COLORS.textGray,
      backgroundColor: COLORS.bgGray02,
    },
  },
  unit: {
    fontWeight: 500,
    fontSize: rem(16),
    lineHeight: rem(24),
    paddingLeft: rem(16),
  },
  input: { border: 'none' },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    inputWrapper: {
      '&.suffix': {
        '& > $unit': { paddingRight: rem(14) },
      },
    },
    unit: { fontSize: rem(14) },
  },
});
