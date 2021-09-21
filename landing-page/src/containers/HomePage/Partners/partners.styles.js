import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';
import COLORS from '../../../constants/COLORS';

export default createUseStyles({
  root: {
    backgroundColor: COLORS.bgGray01,
    maxWidth: '100%',
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },
  slider: { maxWidth: rem(1350), margin: [0, 'auto'] },
  title: {
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    marginTop: 0,
    marginBottom: rem(80),
    textAlign: 'center',
    transition: 'font-size .5s ease, margin .5s ease',
  },
  logo: { display: 'block', maxWidth: rem(160), maxHeight: rem(66) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(48), paddingBottom: rem(48) },
    title: { fontSize: rem(32), lineHeight: rem(40), marginBottom: rem(48) },
  },
});
