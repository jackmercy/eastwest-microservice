import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';

export default createUseStyles({
  footer: { backgroundColor: COLORS.bgBlack01, overflow: 'hidden' },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: rem(112),
    paddingBottom: rem(88),
  },
  group: {},
  groupTitle: { marginBottom: rem(16) },
  groupItem: {
    display: 'block',
    textDecoration: 'none',
    fontSize: rem(16),
    lineHeight: rem(32),
    color: hexToRgbA(COLORS.textWhite, 0.5),
    '&:hover': { color: COLORS.primary },
  },
});
