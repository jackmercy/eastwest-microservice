import { createUseStyles } from 'react-jss';

import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {},

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {},
});
