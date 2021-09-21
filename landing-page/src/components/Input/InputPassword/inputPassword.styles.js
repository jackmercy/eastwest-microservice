import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  inputWrapper: {
    position: 'relative',
    '& > [class^=icon-]': {
      top: '50%',
      right: rem(16),
      fontSize: rem(20),
      cursor: 'pointer',
      position: 'absolute',
      transform: 'translateY(-50%)',
    },
  },
  input: { padding: [rem(11), rem(40), rem(11), rem(16)] },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    inputWrapper: {
      '& > [class^=icon-]': { right: rem(12), fontSize: rem(16) },
    },
    input: { padding: [rem(3), rem(32), rem(3), rem(16)] },
  },
});
