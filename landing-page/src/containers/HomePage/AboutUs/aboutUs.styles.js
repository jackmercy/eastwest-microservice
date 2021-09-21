import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    textAlign: 'center',
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },
  title: {
    fontWeight: 900,
    fontSize: rem(72),
    lineHeight: rem(88),
    margin: 0,
    transition: 'font-size .5s ease',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    maxWidth: rem(1000),
    margin: [rem(48), 'auto', 0],
    transition: 'font-size .5s ease',
  },
  group: {
    marginTop: rem(80),
    display: 'flex',
    justifyContent: 'space-between',
  },
  groupItem: {
    margin: [rem(80), 'auto', 0],
    width: '100%',
    maxWidth: rem(208),
  },
  groupItemImage: { display: 'inline-block', maxHeight: rem(128) },
  groupItemValue: {
    fontWeight: 900,
    fontSize: rem(48),
    lineHeight: rem(64),
    marginTop: rem(32),
    marginBottom: 0,
  },
  groupItemLabel: {
    fontSize: rem(24),
    lineHeight: rem(24),
    marginTop: rem(16),
    marginBottom: 0,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(48), paddingBottom: rem(57) },
    title: { fontSize: rem(32), lineHeight: rem(40) },
    description: { fontSize: rem(16), lineHeight: rem(24), marginTop: rem(16) },
    group: { marginTop: 0, display: 'block' },
  },
});
