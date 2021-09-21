import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    marginBottom: rem(64),
    width: '100%',
    height: rem(566),
    transition: 'height .3s ease',
    overflow: 'hidden',
  },
  main: { flex: 2, marginRight: rem(32) },
  others: { flex: 1, display: 'flex', flexDirection: 'column' },
  mainItem: {},
  otherItem: {
    height: 'auto',
    maxHeight: '50%',
    flex: 1,
    '& + $otherItem': { marginTop: rem(32) },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    root: { height: rem(450) },
    main: { marginRight: rem(24) },
    otherItem: { '& + $otherItem': { marginTop: rem(24) } },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { display: 'block', height: 'auto', marginBottom: rem(32) },
    main: { marginRight: 0, marginBottom: rem(32) },
    mainItem: { height: rem(231) },
    others: { display: 'block' },
    otherItem: {
      height: rem(231),
      maxHeight: '100%',
      '& + $otherItem': { marginTop: rem(32) },
    },
  },
});
