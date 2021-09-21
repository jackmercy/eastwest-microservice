import { createUseStyles } from 'react-jss';

import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  layout: { marginTop: 0 },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    layout: { marginTop: 0 },
  },
});
