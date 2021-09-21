import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';

export default createUseStyles({
  root: {
    backgroundColor: COLORS.bgBlack01,
    width: '100%',
    padding: [rem(48), rem(32), 0],
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  dropdown: {
    margin: [0, rem(-32)],
    padding: [0, rem(32)],
    backgroundColor: COLORS.bgBlack,
  },
  toggleButton: {
    height: rem(48),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > [class^=icon-]': { color: COLORS.textWhite, fontSize: rem(12) },
  },
  menu: {
    margin: [0, rem(-16)],
    padding: 0,
    maxHeight: 0,
    listStyleType: 'none',
    overflow: 'hidden',
    transition: 'max-height .5s ease',
    '&.active': { maxHeight: rem(500) },
  },
  menuItem: {
    padding: [0, rem(16)],
    display: 'flex',
    alignItems: 'center',
    height: rem(48),
    '&:not(:last-child)': {
      borderBottom: `1px solid ${hexToRgbA(COLORS.borderWhite, 0.5)}`,
    },
  },
  menuLink: {
    fontWeight: 'bold',
    fontSize: rem(14),
    lineHeight: rem(24),
    color: hexToRgbA(COLORS.textWhite, 0.8),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
  },
});
