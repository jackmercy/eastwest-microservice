import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    flex: '1 1 auto',
    overflow: 'auto',
    padding: rem(32),
    transition: 'padding .5s ease',
    fontSize: rem(24),
    lineHeight: rem(32),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { padding: rem(16), fontSize: rem(14), lineHeight: rem(20) },
  },
});
