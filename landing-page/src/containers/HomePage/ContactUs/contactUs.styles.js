import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    height: rem(754),
    backgroundImage: 'url(/static/images/homepage/teaser-03.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    transition: 'padding .5s ease',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: rem(127),
    paddingBottom: rem(127),
  },
  title: {
    margin: 0,
    fontWeight: 900,
    fontSize: rem(100),
    lineHeight: rem(120),
    color: COLORS.textWhite,
    transition: 'font-size .5s ease',
  },
  button: {
    '&.large': {
      fontWeight: 600,
      fontSize: rem(32),
      lineHeight: rem(48),
      height: rem(64),
    },
    '&.primary': { color: COLORS.primary, backgroundColor: COLORS.bgWhite },
    padding: [0, rem(32)],
    marginLeft: rem(54),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxLg}px)`]: {
    content: { display: 'block', textAlign: 'center' },
    title: { display: 'block' },
    button: { marginTop: rem(100), marginLeft: 0 },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {
      backgroundImage: 'url(/static/images/homepage/teaser-03-mobile.png)',
      height: rem(520),
    },
    content: { paddingTop: rem(48), paddingBottom: rem(48) },
    title: { fontSize: rem(40), lineHeight: rem(48) },
    button: { marginTop: rem(100), marginLeft: 0 },
  },
});
