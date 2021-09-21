import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';
import COLORS from '../../../constants/COLORS';

export default createUseStyles({
  root: { backgroundColor: COLORS.bgGray01 },
  content: { paddingTop: rem(80), paddingBottom: rem(80) },
  title: {
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    marginTop: 0,
    marginBottom: rem(80),
    textAlign: 'center',
    transition: 'font-size .5s ease, margin .5s ease',
  },
  partners: { display: 'flex', flexWrap: 'wrap' },
  partnerItem: {
    flex: '20% 0',
    maxWidth: '20%',
    marginBottom: rem(64),
    padding: [0, rem(8)],
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  partnerlogo: {
    flex: 'none',
    display: 'block',
    maxWidth: rem(160),
    maxHeight: rem(66),
    margin: [0, 'auto'],
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    partnerItem: { flex: '25% 0', maxWidth: '25%', marginBottom: rem(48) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    content: { paddingTop: rem(32), paddingBottom: rem(32) },
    partnerItem: {
      flex: 'calc(100% / 3) 0',
      maxWidth: 'calc(100% / 3)',
      marginBottom: rem(32),
    },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    title: { fontSize: rem(32), lineHeight: rem(40), marginBottom: rem(48) },
    partnerItem: { flex: 'auto' },
    partnerlogo: { maxWidth: rem(90) },
  },
});
