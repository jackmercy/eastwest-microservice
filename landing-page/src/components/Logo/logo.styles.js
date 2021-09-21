import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';

export default createUseStyles({
  root: {
    display: 'block',
    width: '100%',
    maxWidth: rem(206),
    transition: 'max-width .5s ease',
  },
  image: { display: 'block', width: '100%', height: '100%' },
});
