import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import BREAKPOINTS from '../../constants/BREAKPOINTS';

export default createUseStyles({
  content: { display: 'flex', flexWrap: 'wrap', marginBottom: rem(120) },
  title: {
    flex: '100%',
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(88),
    letterSpacing: '0.01em',
    marginTop: 0,
    marginBottom: rem(18),
  },
  listCategories: { flex: '100%', marginBottom: rem(50) },
  listNews: { flex: '60%' },
  listRankings: { flex: '30%', marginLeft: rem(48) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    listNews: { flex: '50%' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { marginBottom: rem(80) },
    title: {
      order: 2,
      fontSize: rem(32),
      lineHeight: rem(40),
      marginBottom: rem(16),
    },
    listCategories: { order: 3, marginBottom: rem(24) },
    listNews: { flex: '100%', order: 4 },
    listRankings: {
      flex: '100%',
      order: 1,
      marginTop: rem(68),
      marginLeft: 0,
      marginBottom: rem(32),
    },
  },
});
