import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { paddingTop: rem(80), paddingBottom: rem(120) },
  title: {
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    margin: 0,
    transition: 'font-size .5s ease',
    textAlign: 'center',
  },
  description: {
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    textAlign: 'center',
    marginTop: rem(16),
    color: COLORS.primary,
    marginBottom: 0,
    transition: 'font-size .5s ease',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: rem(80),
    boxSizing: 'border-box',
    transition: 'margin .5s ease',
  },
  form: { width: '100%', maxWidth: rem(420), minWidth: rem(320) },
  formInput: { width: '100%', '& + $formInput': { marginTop: rem(16) } },
  formButton: { width: '100%', marginTop: rem(32) },
  coverImage: {
    minWidth: 0,
    alignSelf: 'flex-start',
    display: 'block',
    marginLeft: rem(16),
    width: '100%',
    maxWidth: rem(668),
    marginTop: rem(56),
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    content: { display: 'block' },
    form: { marginLeft: 'auto', marginRight: 'auto' },
    coverImage: { marginLeft: 'auto', marginRight: 'auto' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { paddingTop: rem(48), paddingBottom: rem(80) },
    title: { fontSize: rem(32), lineHeight: rem(40) },
    description: { fontSize: rem(16), lineHeight: rem(24) },
    content: { marginTop: rem(16) },
    form: { maxWidth: '100%', minWidth: rem(200) },
    formInput: { padding: 0, '& + $formInput': { marginTop: rem(16) } },
    formButton: { maxWidth: '100%' },
    coverImage: { maxWidth: '100%', marginLeft: 0, marginTop: rem(60) },
  },
});
