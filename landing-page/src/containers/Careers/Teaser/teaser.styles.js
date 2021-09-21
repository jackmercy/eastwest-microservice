import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  primary: { color: COLORS.primary },
  root: { textAlign: 'center', paddingTop: rem(32), paddingBottom: rem(32) },
  title: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(64),
    lineHeight: rem(88),
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(16),
    marginBottom: 0,
  },
  button: {
    marginTop: rem(24),
    paddingLeft: rem(24),
    paddingRight: rem(24),
  },
  image: {
    width: '100%',
    height: rem(557),
    backgroundImage: 'url(/static/images/careers/teaser.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingBottom: rem(48) },
    title: { fontSize: rem(40), lineHeight: rem(48) },
    description: {
      fontSize: rem(16),
      lineHeight: rem(24),
      marginTop: rem(16),
    },
    image: {
      height: rem(586),
      backgroundImage: 'url(/static/images/careers/teaser-mobile.png)',
    },
  },
});
