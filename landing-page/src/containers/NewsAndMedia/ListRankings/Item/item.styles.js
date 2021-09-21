import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { display: 'flex', '& + $root': { marginTop: rem(48) } },
  thumbnailLayout: {
    flex: 'none',
    position: 'relative',
    width: rem(120),
    height: rem(120),
  },
  thumbnailWrapper: {
    borderRadius: rem(5),
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  ranking: {
    top: 0,
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    whiteSpace: 'nowrap',
    zIndex: 1,
    fontWeight: 900,
    fontSize: rem(64),
    lineHeight: rem(64),
    margin: 0,
    color: COLORS.textBlack,
    '& > span': { color: COLORS.primary },
  },
  content: {
    marginLeft: rem(24),
    flex: '1 1 auto',
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
    marginTop: rem(8),
    marginBottom: 0,
    textDecoration: 'none',
    color: COLORS.textBlack01,
    '&:hover': { color: COLORS.primary },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { '& + $root': { marginTop: rem(68) } },
    content: { marginLeft: rem(16) },
    title: { fontSize: rem(16), lineHeight: rem(24), marginTop: rem(14) },
  },
});
