import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    flex: 'none',
    backgroundColor: 'inherit',
    textAlign: 'right',
    padding: [0, rem(32), rem(32), rem(32)],
    transition: 'padding .5s ease',
    borderRadius: [0, 0, rem(8), rem(8)],
  },
  button: {
    height: rem(40),
    padding: [0, rem(32)],
    transition: 'padding .5s ease, height .5s ease',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { padding: [0, rem(16), rem(16), rem(16)] },
    button: { height: rem(32), padding: [0, rem(16)] },
  },
});
