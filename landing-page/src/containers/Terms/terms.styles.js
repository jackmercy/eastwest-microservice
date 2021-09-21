import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  teaser: {
    width: '100%',
    height: rem(280),
    boxSizing: 'border-box',
    backgroundImage: 'url(/static/images/terms/teaser.png)',
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
  },
  teaserTitle: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(72),
    lineHeight: rem(88),
  },
  content: { paddingTop: rem(32), paddingBottom: rem(64) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    teaser: { height: rem(248) },
    teaserTitle: { fontSize: rem(40), lineHeight: rem(48) },
    teaserDescription: {
      fontSize: rem(16),
      lineHeight: rem(24),
      marginTop: rem(16),
    },
  },
});
