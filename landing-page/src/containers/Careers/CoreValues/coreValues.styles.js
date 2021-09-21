import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { marginTop: rem(160) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { marginTop: rem(64) },
  },
});
