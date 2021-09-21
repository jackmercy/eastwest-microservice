import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';
import COLORS from '../../constants/COLORS';

export default createUseStyles({
  slider: {
    padding: [0, rem(32)],
    '& img': { margin: [0, 'auto'] },
    '& .slick-track, & .slick-slide': {
      display: 'flex',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .slick-dots': { left: 0 },
    '& .slick-prev': { left: 0 },
    '& .slick-next': { right: 0 },
  },
  customArrow: {
    top: '50%',
    cursor: 'pointer',
    position: 'absolute',
    color: COLORS.textGray01,
    transform: 'translateY(-50%)',
    '& > [class^=icon-]': { fontSize: rem(32) },
    '&.prev': { left: 0 },
    '&.next': { right: 0 },
  },
});
