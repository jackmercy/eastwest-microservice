import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundImage: 'url(/static/images/homepage/teaser-02.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transition: 'padding .5s ease',
    overflow: 'hidden',
  },
  contentLayout: { paddingTop: rem(80), paddingBottom: rem(80) },
  content: { textAlign: 'center', maxWidth: rem(1000), margin: [0, 'auto'] },
  logo: {
    maxWidth: rem(712),
    margin: [0, 'auto'],
    transition: 'max-width .5s ease',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(40),
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },
  button: {
    marginTop: rem(32),
    padding: [0, rem(32)],
    transition: 'margin .5s ease',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      backgroundImage: 'url(/static/images/homepage/teaser-02-mobile.png)',
    },
    contentLayout: { paddingTop: rem(48), paddingBottom: rem(55) },
    logo: { maxWidth: rem(268) },
    description: { fontSize: rem(16), lineHeight: rem(28), marginTop: rem(24) },
    button: { marginTop: rem(49) },
  },
});
