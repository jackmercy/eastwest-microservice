import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  sectionTitle: { marginTop: rem(160) },
  text: { fontSize: rem(24), lineHeight: rem(40) },
  benefits: { display: 'flex', flexWrap: 'wrap', margin: [0, rem(-8)] },
  benefit: {
    marginTop: rem(64),
    flex: `${100 / 3}%`,
    boxSizing: 'border-box',
    padding: [0, rem(8)],
  },
  benefitImage: {
    display: 'inine-block',
    height: 'auto',
    maxHeight: rem(64),
    boxSizing: 'border-box',
  },
  benefitTitle: {
    fontWeight: 'bold',
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: 0,
    '& > [class^=icon]': {
      fontSize: rem(11),
      verticalAlign: 'middle',
      margin: [0, rem(10)],
    },
  },
  benefitDescription: {
    fontSize: rem(18),
    lineHeight: rem(32),
    marginTop: rem(16),
    marginBottom: 0,
  },
  ourOffice: { marginTop: rem(32) },
  ourOfficeTitle: {
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(48),
    marginTop: 0,
    marginBottom: rem(24),
  },
  ourOfficeImage: { display: 'block', width: '100%', boxSizing: 'border-box' },
  ourOfficeIntroWrapper: { display: 'flex', margin: [rem(64), rem(-16), 0] },
  ourOfficeIntro: {
    display: 'flex',
    flexDirection: 'column',
    flex: '50%',
    padding: [0, rem(16)],
  },
  ourOfficeIntroTitle: {
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(40),
    marginTop: 0,
    marginBottom: rem(24),
  },
  ourOfficeDescription: {
    flex: '1 1 auto',
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: 0,
    marginBottom: rem(24),
  },
  ourOfficeLink: {
    flex: 'none',
    textDecoration: 'none',
    color: COLORS.primary,
    margin: 0,
    '& > [class^=icon-]': {
      fontSize: rem(10),
      verticalAlign: 'middle',
      marginLeft: rem(12),
    },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    benefits: { margin: [0, rem(-16)] },
    benefit: { flex: '50%', maxWidth: '100%', padding: [0, rem(16)] },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    sectionTitle: { marginTop: rem(64) },
    text: { textAlign: 'center', fontSize: rem(16), lineHeight: rem(24) },
    benefits: { margin: 0 },
    benefit: { flex: '100%', textAlign: 'center', padding: 0 },
    benefitDescription: { fontSize: rem(16), lineHeight: rem(24) },
    ourOffice: { marginTop: rem(64) },
    ourOfficeTitle: { lineHeight: rem(32) },
    ourOfficeIntroWrapper: { display: 'block', margin: [rem(32), 0, 0] },
    ourOfficeIntro: {
      flex: '100%',
      padding: 0,
      textAlign: 'center',
      '& + $ourOfficeIntro': { marginTop: rem(32) },
    },
    ourOfficeIntroTitle: {
      fontSize: rem(24),
      lineHeight: rem(32),
      marginBottom: rem(16),
    },
    ourOfficeDescription: {
      flex: 'none',
      fontSize: rem(16),
      lineHeight: rem(24),
    },
    ourOfficeLink: {
      '& > [class^=icon-]': { display: 'none' },
    },
  },
});
