import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    display: 'flex',
    '& + $root': { marginTop: rem(24) },
    '& $root': {
      '& $avatarWrapper': { width: rem(32), height: rem(32) },
      '& $information': { marginLeft: rem(16) },
    },
  },
  avatarWrapper: {
    flex: 'none',
    borderRadius: '50%',
    overflow: 'hidden',
    width: rem(48),
    height: rem(48),
    backgroundColor: COLORS.bgGray01,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  information: { marginLeft: rem(40), flex: '1 1 auto' },
  summary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(8),
  },
  name: {
    fontWeight: 900,
    fontSize: rem(18),
    lineHeight: rem(28),
    margin: 0,
  },
  date: {
    fontSize: rem(14),
    marginLeft: rem(8),
    fontWeight: 400,
    color: hexToRgbA(COLORS.textBlack01, 0.5),
    '&::before': { content: '"•"', marginRight: rem(8) },
  },
  options: {
    padding: [0, rem(8)],
    marginLeft: rem(8),
    cursor: 'pointer',
    fontSize: rem(16),
    border: 'none',
    backgroundColor: 'transparent',
    position: 'relative',
    '&:focus': { outline: 'none' },
    '& > [class^=icon-]': { fontSize: rem(12), cursor: 'pointer' },
  },
  popupMenu: { top: rem(24) },
  comment: {
    fontWeight: 400,
    fontSize: rem(18),
    lineHeight: rem(28),
    marginTop: 0,
    marginBottom: rem(16),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    fontSize: rem(14),
    lineHeight: rem(24),
    color: hexToRgbA(COLORS.bgBlack01, 0.5),
  },
  like: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    '& > [class^=icon-]': {
      cursor: 'pointer',
      fontSize: rem(14),
      marginRight: rem(12),
      '&:hover': { color: COLORS.primary },
    },
    '&.liked > [class^=icon-]': { color: COLORS.primary },
  },
  reply: {
    cursor: 'pointer',
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    marginLeft: rem(32),
    border: 'none',
    backgroundColor: 'transparent',
    '&:disabled': { cursor: 'not-allowed' },
    '&:not(:disabled):hover': { color: COLORS.primary },
  },
  commentBox: { marginTop: rem(16), marginBottom: 0 },
  othersButton: {
    display: 'inline-block',
    marginTop: rem(24),
    marginBottom: rem(16),
    fontWeight: 600,
    fontSize: rem(14),
    lineHeight: rem(24),
    color: COLORS.primary,
    cursor: 'pointer',
    '&.show': { '& > [class^=icon-]': { transform: 'rotate(-180deg)' } },
    '& > [class^=icon-]': {
      transition: 'transform .3s ease',
      display: 'inline-block',
      marginLeft: rem(12),
      fontSize: rem(10),
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    information: { marginLeft: rem(24) },
    name: { fontSize: rem(14), lineHeight: rem(20) },
    date: { fontSize: rem(11), lineHeight: rem(16) },
    comment: { fontSize: rem(14), lineHeight: rem(20), marginBottom: rem(8) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    information: { marginLeft: rem(12) },
  },
});
