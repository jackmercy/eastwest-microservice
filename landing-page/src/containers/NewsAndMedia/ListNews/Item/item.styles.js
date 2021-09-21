import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    position: 'relative',
    '& + $root': {
      marginTop: rem(90),
    },
    '&:nth-child(2n + 2)::before': {
      backgroundColor: hexToRgbA(COLORS.bgBlack01, 0.1),
    },
    '&::before': {
      content: '" "',
      left: '50%',
      zIndex: -1,
      top: rem(-16),
      position: 'absolute',
      width: '8.75em',
      height: '8.75em',
      borderRadius: rem(5),
      backgroundColor: hexToRgbA(COLORS.primary, 0.1),
      transform: 'translateX(-35%) rotate(45deg)',
    },
  },
  thumbnailWrapper: {
    borderRadius: rem(5),
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    flex: '50% 0 0',
    maxWidth: rem(400),
    height: rem(267),
  },
  thumbnail: {
    width: '100%',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    marginLeft: rem(24),
    flex: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    color: COLORS.primary,
    margin: 0,
    textDecoration: 'none',
    '&:hover': { opacity: 0.8 },
  },
  title: {
    flex: '1 1 auto',
    fontWeight: 900,
    fontSize: rem(18),
    lineHeight: rem(28),
    marginTop: 0,
    marginBottom: rem(8),
    textDecoration: 'none',
    color: COLORS.textBlack01,
    '&:hover': { color: COLORS.primary },
  },
  description: {
    fontWeight: 400,
    fontSize: rem(16),
    lineHeight: rem(24),
    marginTop: 0,
    marginBottom: rem(16),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: {
      display: 'block',
      '& + $root': { marginTop: rem(32) },
      '&::before': {
        left: 0,
        top: '50%',
        width: '5.25em',
        height: '5.25em',
        transform: 'translateX(-50%) rotate(45deg)',
      },
    },
    thumbnailWrapper: { maxWidth: '100%', height: rem(232) },
    thumbnail: { width: '125%', height: 'auto' },
    content: { marginLeft: 0, marginTop: rem(16), display: 'block' },
  },
});
