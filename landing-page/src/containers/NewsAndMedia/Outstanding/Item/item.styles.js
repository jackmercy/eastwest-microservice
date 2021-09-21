import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: rem(5),
    '&.main $content::before': { backgroundColor: COLORS.primary },
  },
  thumbnail: {
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    backdropFilter: 'blur(5px)',
  },
  content: {
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: [rem(5), rem(5), 0, 0],
    position: 'absolute',
    padding: [rem(32), rem(40), rem(53)],
    backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.4),
    '&::before': {
      content: '" "',
      left: 0,
      zIndex: -1,
      top: rem(-32),
      position: 'absolute',
      width: '9.5em',
      height: '9.5em',
      borderRadius: rem(5),
      backgroundColor: COLORS.bgBlack01,
      transform: 'translateX(20%) rotate(45deg)',
    },
  },
  category: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    margin: 0,
    color: COLORS.textWhite,
    textDecoration: 'none',
    '&:hover': { opacity: 0.8 },
  },
  title: {
    fontWeight: 900,
    fontSize: rem(40),
    lineHeight: rem(56),
    overflow: 'hidden',
    marginTop: rem(16),
    marginBottom: 0,
    color: COLORS.textWhite,
    textDecoration: 'none',
    display: 'block',
    '&:hover': { opacity: 0.8 },
  },
  smallView: {
    '&.small': {
      '& $content': {
        padding: [rem(24), rem(24), rem(32)],
        '&::before': { top: rem(-8), width: '4.5em', height: '4.5em' },
      },
      '& $category': { fontSize: rem(12), lineHeight: rem(16) },
      '& $title': {
        fontSize: rem(18),
        lineHeight: rem(28),
        marginTop: rem(8),
      },
    },
  },

  [`@media only screen and (min-width: ${BREAKPOINTS.minMd}px)`]: {
    root: {
      '&.small': {
        '& $content': {
          padding: [rem(24), rem(24), rem(32)],
          '&::before': {
            top: rem(-8),
            width: '4.5em',
            height: '4.5em',
            backgroundColor: COLORS.bgBlack01,
          },
        },
        '& $category': { fontSize: rem(12), lineHeight: rem(16) },
        '& $title': {
          fontSize: rem(18),
          lineHeight: rem(28),
          marginTop: rem(8),
        },
      },
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: {
      padding: [rem(10), rem(16), rem(12)],
      minHeight: rem(103),
      '&::before': { top: rem(-8), width: '3em', height: '3em' },
    },
    category: { fontSize: rem(12), lineHeight: rem(16) },
    title: { fontSize: rem(18), lineHeight: rem(32), marginTop: 0 },
  },
});
