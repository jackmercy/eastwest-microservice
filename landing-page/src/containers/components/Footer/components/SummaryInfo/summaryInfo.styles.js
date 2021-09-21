import { createUseStyles } from 'react-jss';

import COLORS from '../../../../../constants/COLORS';
import { rem, hexToRgbA } from '../../../../../utils/jss';
import BREAKPOINTS from '../../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { maxWidth: rem(270) },
  logo: { maxWidth: rem(219) },
  description: {
    marginTop: rem(16),
    marginBottom: 0,
    fontSize: rem(14),
    lineHeight: rem(24),
    color: hexToRgbA(COLORS.textWhite, 0.5),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { maxWidth: '100%', marginBottom: rem(40) },
    logo: { maxWidth: rem(224) },
    description: { marginTop: rem(24) },
  },
});
