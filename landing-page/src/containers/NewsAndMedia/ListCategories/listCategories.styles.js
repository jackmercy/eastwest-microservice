import { createUseStyles } from 'react-jss';

import { hexToRgbA, rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    padding: rem(8),
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: rem(18),
    lineHeight: rem(24),
    position: 'relative',
    whiteSpace: 'nowrap',
    '& + $listItem': { marginLeft: rem(32) },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      left: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
      transition: 'width .5s ease',
      borderRadius: rem(4),
      height: rem(2),
    },
    '&:hover': {
      '& > $link': { color: COLORS.primary },
      '&::after': { width: '100%' },
    },
    '&.active::after': { width: '100%' },
  },
  link: { color: COLORS.textBlack01, textDecoration: 'none' },
  moreItems: {
    display: 'flex',
    alignItems: 'center',
    '& > [class^=icon-]': {
      marginLeft: rem(10),
      fontSize: rem(8),
      transition: 'transform .5s ease',
    },
    '&.open': {
      color: COLORS.primary,
      '&::after': { width: '100%' },
      '& > [class^=icon-]': { transform: 'rotate(-180deg)' },
    },
  },
  popupList: {
    zIndex: 20,
    display: 'block',
    position: 'absolute',
    listStyle: 'none',
    margin: 0,
    left: 0,
    top: rem(48),
    backgroundColor: COLORS.bgWhite,
    borderRadius: rem(8),
    padding: [rem(8), 0],
    minWidth: rem(220),
    maxWidth: rem(300),
    maxHeight: rem(250),
    overflow: 'auto',
    boxShadow: '2px 4px 25px rgba(0, 0, 0, 0.25)',
  },
  popupListItem: {
    padding: [rem(8), rem(24)],
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: rem(18),
    lineHeight: rem(24),
    color: COLORS.textBlack01,
    '&:hover, &.active': {
      backgroundColor: COLORS.bgGray,
    },
  },
  inputSearch: { width: '100%', maxWidth: rem(376), marginLeft: rem(24) },
  inputClassName: {
    borderRadius: rem(100),
    '&:not(:focus)': {
      border: 'none',
      color: COLORS.textGray02,
      backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.05),
      '& + [class^=icon-]': { color: COLORS.textGray02 },
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { display: 'block', overflow: 'hidden' },
    list: { overflow: 'auto' },
    inputSearch: { marginLeft: 0, marginTop: rem(24), maxWidth: '100%' },
  },
});
