import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  content: { maxWidth: rem(901), paddingTop: rem(40), paddingBottom: rem(200) },
  button: {
    display: 'flex',
    margin: [rem(88), 'auto', 0],
    padding: [0, rem(32)],
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingTop: rem(32), paddingBottom: rem(80) },
    button: { marginTop: rem(40) },
  },
});
