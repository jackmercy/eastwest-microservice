import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';
import COLORS from '../../../constants/COLORS';

export default createUseStyles({
  teaser: {
    width: '100%',
    height: rem(280),
    boxSizing: 'border-box',
    backgroundImage: 'url(/static/images/coming-soon/teaser.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  },
  teaserContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    color: COLORS.textWhite,
    boxSizing: 'border-box',
  },
  teaserTitle: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(72),
    lineHeight: rem(88),
  },
  content: {
    boxSizing: 'border-box',
    textAlign: 'center',
    paddingTop: rem(32),
    paddingBottom: rem(192),
  },
  image: {
    width: '100%',
    display: 'inline-block',
    maxWidth: rem(512),
  },
  title: {
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(48),
    marginTop: rem(16),
    marginBottom: 0,
  },
  description: {
    fontSize: rem(16),
    lineHeight: rem(32),
    marginTop: rem(8),
    marginBottom: 0,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    teaser: {
      height: rem(184),
      backgroundImage: 'url(/static/images/coming-soon/teaser-mobile.png)',
    },
    teaserTitle: { fontSize: rem(40), lineHeight: rem(48) },
    content: { paddingBottom: rem(100) },
    image: { maxWidth: rem(300) },
    title: { fontSize: rem(18), lineHeight: rem(28) },
    description: { fontSize: rem(14), lineHeight: rem(20) },
  },
});
