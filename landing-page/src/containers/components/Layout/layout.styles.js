import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    marginTop: rem(112), // Size of fixed header
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { marginTop: rem(56) },
  },
});
