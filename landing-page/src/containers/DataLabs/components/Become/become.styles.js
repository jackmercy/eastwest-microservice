import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.02) },
  content: { paddingTop: rem(80), paddingBottom: rem(24) },
  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    margin: 0,
    transition: 'font-size .5s ease',
  },
  listItems: {
    marginTop: rem(64),
    boxSizing: 'border-box',
    display: 'flex',
  },
  itemWrapper: { boxSizing: 'border-box' },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(44),
    margin: 0,
  },
  itemGroup: { marginTop: rem(48), display: 'flex', alignItems: 'center' },
  itemImage: {
    display: 'block',
    flex: 'none',
    width: '100%',
    maxWidth: rem(80),
    marginRight: rem(40),
  },
  itemNumber: {
    fontWeight: 'bold',
    fontSize: rem(64),
    lineHeight: rem(72),
    margin: 0,
    color: COLORS.primary,
  },
  itemDescription: {
    fontSize: rem(24),
    lineHeight: rem(32),
    marginTop: rem(48),
    marginBottom: 0,
  },

  [`@media only screen and (min-width: ${BREAKPOINTS.minLg}px)`]: {
    listItems: { marginLeft: rem(-20), marginRight: rem(-20) },
    itemWrapper: { paddingLeft: rem(20), paddingRight: rem(20) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    listItems: { display: 'block' },
    itemWrapper: {
      textAlign: 'center',
      '& + $itemWrapper': { marginTop: rem(40) },
    },
    itemGroup: { justifyContent: 'center' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingTop: rem(40), paddingBottom: rem(20) },
    title: { fontSize: rem(32), lineHeight: rem(40) },
    listItems: { marginTop: rem(32) },
    itemGroup: { marginTop: rem(24) },
    itemTitle: { fontSize: rem(24), lineHeight: rem(32) },
    itemImage: { maxWidth: rem(64), marginRight: rem(24) },
    itemNumber: { fontSize: rem(56), lineHeight: rem(64) },
    itemDescription: {
      fontSize: rem(16),
      lineHeight: rem(24),
      marginTop: rem(24),
    },
  },
});
