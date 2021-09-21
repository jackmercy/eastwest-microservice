import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    height: rem(240),
    backgroundColor: COLORS.primary,
    backgroundImage: 'url(/static/images/data-labs/join-us.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  },
  content: { display: 'flex', alignItems: 'center', height: '100%' },
  description: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    color: COLORS.textWhite,
  },
  button: { flex: 'none', marginLeft: rem(45) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      height: rem(280),
      backgroundImage: 'url(/static/images/data-labs/join-us-mobile.png)',
      backgroundPosition: 'left',
    },
    content: { flexDirection: 'column', justifyContent: 'center' },
    description: {
      width: '100%',
      fontSize: rem(32),
      lineHeight: rem(48),
      textAlign: 'center',
    },
    button: {
      padding: [0, rem(32)],
      marginLeft: 0,
      marginTop: rem(24),
      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
});
