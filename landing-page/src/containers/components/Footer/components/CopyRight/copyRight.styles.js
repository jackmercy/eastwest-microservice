import { createUseStyles } from 'react-jss';

import COLORS from '../../../../../constants/COLORS';
import { rem, hexToRgbA } from '../../../../../utils/jss';
import BREAKPOINTS from '../../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: [rem(40), 0],
    transition: 'padding .35s ease',
    position: 'relative',
    '&:before': {
      height: 1,
      top: 0,
      left: '50%',
      width: '100%',
      content: '""',
      position: 'absolute',
      transform: 'translateX(-50%)',
      backgroundColor: hexToRgbA(COLORS.borderWhite, 0.1),
    },
  },
  item: {
    margin: 0,
    flex: 'none',
    fontSize: rem(16),
    lineHeight: rem(24),
    color: COLORS.textWhite,
    textDecoration: 'none',
    '&:not(:last-child)': { marginRight: rem(24) },
    '&:first-child': {
      flex: '1 1 auto',
      color: hexToRgbA(COLORS.textWhite, 0.5),
    },
    '&:not(:first-child):hover': { color: COLORS.primary },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { flexWrap: 'wrap', justifyContent: 'center', marginTop: rem(32) },
    item: {
      '&:first-child': {
        width: '100%',
        textAlign: 'center',
        marginRight: 0,
        marginBottom: rem(16),
      },
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      justifyContent: 'space-between',
      padding: [rem(24), 0, rem(32)],
      '&:before': { width: `calc(100% + ${rem(64)})` },
    },
    item: {
      fontSize: rem(14),
      textAlign: 'center',
      '&:first-child': {
        marginBottom: 0,
        fontSize: rem(12),
        lineHeight: rem(20),
      },
      '&:not(:first-child)': { marginTop: rem(16), flex: '1 1 auto' },
      '&:not(:last-child)': { marginRight: 0 },
      '&:nth-child(4)': { order: 5 },
      '&:nth-child(5)': { order: 4 },
    },
  },
});
