import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
  },
  menu: {
    flex: '1 1 auto',
    position: 'sticky',
    top: rem(120),
    minWidth: rem(200),
    alignSelf: 'flex-start',
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    borderLeft: `${rem(2)} solid ${COLORS.borderGray01}`,
  },
  menuItem: {
    color: COLORS.textBlack01,
    '& + $menuItem': { marginTop: rem(22) },
  },
  menuLink: {
    display: 'block',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    position: 'relative',
    padding: [rem(5), rem(10)],
    color: COLORS.textBlack01,
    '&::before, &::after': {
      width: rem(2),
      display: 'block',
      position: 'absolute',
      left: rem(-2),
      top: '50%',
      transform: 'translate(-35%, -50%)',
    },
    '&::before': {
      zIndex: 2,
      height: rem(26),
      borderRadius: rem(2),
      backgroundColor: COLORS.primary,
    },
    '&::after': {
      zIndex: 1,
      height: rem(34),
      backgroundColor: COLORS.bgWhite,
    },
    '&.active': {
      color: COLORS.primary,
      '&::before, &::after': { content: '""' },
    },
  },
  content: {
    width: '100%',
    maxWidth: rem(1002),
    overflow: 'hidden',
    paddingBottom: rem(160),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    menu: { display: 'none' },
    content: { maxWidth: '100%' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingBottom: rem(100) },
  },
});
