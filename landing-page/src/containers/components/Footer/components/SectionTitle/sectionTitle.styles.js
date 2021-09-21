import { createUseStyles } from 'react-jss';

import { rem } from '../../../../../utils/jss';
import COLORS from '../../../../../constants/COLORS';

export default createUseStyles({
  root: {
    fontWeight: 900,
    fontSize: rem(18),
    lineHeight: rem(32),
    textTransform: 'uppercase',
    color: COLORS.textWhite,
    margin: 0,
  },
});
