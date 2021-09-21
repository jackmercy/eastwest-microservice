import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  text: { fontSize: rem(24), lineHeight: rem(40) },
  image: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    margin: [rem(48), 0],
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    text: { textAlign: 'center', fontSize: rem(16), lineHeight: rem(24) },
    image: { margin: [rem(32), 0] },
  },
});
