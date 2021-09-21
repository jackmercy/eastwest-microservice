import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: {
    padding: [rem(50), rem(16)],
    textAlign: 'center',
  },
  image: {
    display: 'block',
    width: '100%',
    maxWidth: rem(570),
    margin: [0, 'auto'],
  },
  title: {
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(48),
    marginTop: rem(32),
    marginBottom: 0,
  },
  description: {
    fontSize: rem(16),
    lineHeight: rem(24),
    margin: 0,
  },
  button: { marginTop: rem(32), minWidth: rem(145) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: {},
    image: {},
    title: {},
    description: {},
    button: {},
  },
});
