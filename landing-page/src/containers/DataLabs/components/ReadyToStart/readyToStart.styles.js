import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.02) },
  contentWrapper: { paddingTop: rem(24), paddingBottom: rem(120) },
  content: { position: 'relative' },
  image: { display: 'block', width: '100%' },
  group: {
    position: 'absolute',
    left: rem(64),
    top: rem(56),
    maxWidth: rem(400),
  },
  title: {
    fontWeight: 900,
    fontSize: rem(48),
    lineHeight: rem(64),
    margin: 0,
  },
  button: { marginTop: rem(40) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { backgroundColor: COLORS.bgPink },
    contentWrapper: { paddingTop: rem(20), paddingBottom: rem(32) },
    group: { position: 'static', maxWidth: '100%', textAlign: 'center' },
    title: { marginTop: rem(24) },
    image: {
      maxWidth: rem(375),
      marginLeft: 'auto',
      marginRight: 'auto',
      '& + $image': { marginTop: rem(16) },
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    title: { fontSize: rem(32), lineHeight: rem(40) },
    button: { marginTop: rem(30) },
  },
});
