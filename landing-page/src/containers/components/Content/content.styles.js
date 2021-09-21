import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: rem(32),
    paddingRight: rem(32),
    maxWidth: rem(1334),
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'padding .5s ease',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingLeft: rem(16), paddingRight: rem(16) },
  },
});
