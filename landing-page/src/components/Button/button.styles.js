import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    lineHeight: rem(24),
    padding: [0, rem(16)],
    textAlign: 'center',
    borderRadius: rem(5),
    position: 'relative',
    transition: 'background-color .1s linear',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textDecoration: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&:focus': { outline: 'none' },
    '&:hover': { cursor: 'pointer' },
    '&.large': { height: rem(48), fontSize: rem(18) },
    '&.medium': { height: rem(40), fontSize: rem(16) },
    '&.small': { height: rem(32), fontSize: rem(14) },
    '&.primary': {
      border: 'none',
      color: COLORS.textWhite,
      backgroundColor: COLORS.primary,
      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
      '&.disabled': {
        boxShadow: 'none',
        cursor: 'not-allowed',
        color: COLORS.textGray,
        backgroundColor: COLORS.bgGray02,
      },
    },
    '&.secondary': {
      color: COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      backgroundColor: COLORS.bgWhite,
      '&.disabled': {
        cursor: 'not-allowed',
        borderColor: COLORS.borderGray01,
        color: COLORS.textGray,
      },
    },
    '&.tertiary': {
      color: COLORS.textBlack01,
      border: 'none',
      backgroundColor: 'transparent',
      '&.disabled': { cursor: 'not-allowed', color: COLORS.textGray },
    },
  },

  '@media (hover: hover) and (pointer: fine)': {
    root: {
      '&.primary:not(.disabled):hover': {
        opacity: 0.75,
      },
      '&.secondary:not(.disabled):hover': {
        opacity: 0.75,
      },
      '&.tertiary:not(.disabled):hover': {
        opacity: 0.75,
      },
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      '&:not(.keepSize)': {
        '&.large, &.medium, &.small': { fontSize: rem(14), height: rem(32) },
      },
    },
  },
});
