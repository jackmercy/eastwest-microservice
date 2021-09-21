import { createUseStyles } from 'react-jss';

import { rem } from '../../../../../utils/jss';
import COLORS from '../../../../../constants/COLORS';
import BREAKPOINTS from '../../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { display: 'inline-block', marginTop: rem(32) },
  form: { display: 'flex', marginTop: rem(12) },
  input: { width: '100%', maxWidth: rem(231) },
  customInput: {
    borderColor: COLORS.borderWhite,
    borderRadius: `${rem(2)} 0 0 ${rem(2)}`,
  },
  button: { flex: 'none', borderRadius: `0 ${rem(2)} ${rem(2)} 0` },
  socials: {
    display: 'flex',
    marginTop: rem(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialsItem: {
    flex: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    color: COLORS.textWhite,
    '& > [class^=icon-]': { margin: 'auto', fontSize: rem(16) },
    '&:hover': { color: COLORS.primary },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { display: 'block', marginTop: rem(32) },
    input: { maxWidth: '100%' },
  },
});
