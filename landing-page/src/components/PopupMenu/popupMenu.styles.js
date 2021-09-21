import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';

export default createUseStyles({
  menu: {
    zIndex: 20,
    display: 'block',
    position: 'absolute',
    listStyle: 'none',
    textAlign: 'left',
    margin: 0,
    top: rem(40),
    backgroundColor: COLORS.bgWhite,
    borderRadius: rem(8),
    padding: [rem(12), 0],
    minWidth: rem(120),
    maxWidth: rem(300),
    maxHeight: rem(250),
    overflow: 'auto',
    boxShadow: '2px 4px 25px rgba(0, 0, 0, 0.25)',
    '&.left': { left: 0 },
    '&.right': { right: 0 },
  },
  menuItem: {
    textAlign: 'inherit',
    padding: [rem(8), rem(16)],
    cursor: 'pointer',
    fontWeight: 400,
    fontSize: rem(16),
    lineHeight: rem(24),
    color: COLORS.textBlack01,
    whiteSpace: 'nowrap',
    '&:hover, &.active': {
      backgroundColor: COLORS.bgGray,
      color: COLORS.primary,
    },
  },
});
