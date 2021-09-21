import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';

export default createUseStyles({
  root: {
    margin: rem(-16),
    display: 'flex',
    flexWrap: 'wrap',
    transition: 'margin .5s ease',
  },
  item: {
    padding: rem(16),
    flex: '1 1 auto',
    '&:nth-of-child(3n + 1)': { flex: '2 1 auto' },
  },
  image: {
    display: 'block',
    margin: [0, 'auto'],
    maxHeight: rem(382),
    borderRadius: rem(15),
  },
});
