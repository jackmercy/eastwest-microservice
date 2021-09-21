import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '-10%',
  },
  coverImage: {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url(/static/images/talent-labs/teaser.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  content: {
    textAlign: 'center',
    width: '100%',
    maxWidth: rem(806),
    margin: [0, 'auto'],
    transform: 'translateY(-50%)',
    borderRadius: rem(12),
    padding: rem(64),
    boxSizing: 'border-box',
    transition: 'padding .5s ease, left .5s ease, max-width .5s ease .3s',
    backgroundColor: COLORS.bgWhite,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  },
  logo: { maxWidth: rem(300), display: 'inline-block' },
  title: {
    fontWeight: 900,
    fontSize: rem(72),
    lineHeight: rem(80),
    marginTop: rem(32),
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(16),
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxXXl}px)`]: {
    content: { maxWidth: rem(700), padding: [rem(48), rem(32)] },
    logo: { maxWidth: rem(250) },
    title: { fontSize: rem(48), lineHeight: rem(64), marginTop: rem(24) },
    description: { fontSize: rem(20), lineHeight: rem(28) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    content: { maxWidth: rem(600), padding: [rem(32), rem(24)] },
    logo: { maxWidth: rem(200) },
    title: { fontSize: rem(40), lineHeight: rem(48) },
    description: { fontSize: rem(16), lineHeight: rem(24) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginBottom: '-25%' },
    coverImage: {
      maxWidth: '100%',
      backgroundImage: 'url(/static/images/talent-labs/teaser-mobile.svg)',
    },
    content: {
      maxWidth: `calc(100% - ${rem(32)})`,
      left: 0,
      transform: 'translateY(-60%)',
      padding: [rem(32), rem(16)],
    },
    logo: { maxWidth: rem(176) },
    title: { fontSize: rem(32), lineHeight: rem(48) },
    description: { fontSize: rem(14), lineHeight: rem(20) },
  },
});
