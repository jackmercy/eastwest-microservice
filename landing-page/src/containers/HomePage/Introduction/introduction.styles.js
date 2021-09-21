import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    padding: [rem(80), rem(16), rem(74)],
    backgroundColor: COLORS.bgBlack01,
    transition: 'padding .5s ease',
  },
  title: {
    fontWeight: 900,
    fontSize: rem(72),
    lineHeight: rem(88),
    color: COLORS.textWhite,
    marginTop: 0,
    marginBottom: rem(70),
    textAlign: 'center',
    transition: 'font-size .5s ease, margin .5s ease',
  },
  video: { width: '100%', maxWidth: rem(1272), margin: [0, 'auto'] },
  ratio: {
    height: 0,
    width: '100%',
    position: 'relative',
    paddingBottom: '56.25%',
  },
  iframe: {
    top: 0,
    left: 0,
    border: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(40), paddingBottom: rem(48) },
    title: { fontSize: rem(32), lineHeight: rem(40), marginBottom: rem(32) },
  },
});
