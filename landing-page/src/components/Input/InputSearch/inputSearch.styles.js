import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  inputWrapper: {
    position: 'relative',
    '& > [class^=icon-]': {
      top: '50%',
      right: rem(16),
      fontSize: rem(16),
      cursor: 'pointer',
      position: 'absolute',
      transform: 'translateY(-50%)',
      color: COLORS.primary,
    },
  },
  input: { paddingRight: rem(40) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    inputWrapper: {
      '& > [class^=icon-]': { right: rem(12) },
    },
    input: { paddingRight: rem(32) },
  },
});
