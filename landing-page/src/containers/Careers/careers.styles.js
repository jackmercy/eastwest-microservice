import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  menuScrollableLayout: { paddingTop: rem(120) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    menuScrollableLayout: { paddingTop: rem(48) },
  },
});
