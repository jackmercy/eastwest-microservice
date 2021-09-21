import { createUseStyles } from 'react-jss';

import COLORS from '../../constants/COLORS';
import { hexToRgbA, rem } from '../../utils/jss';

export default createUseStyles({
  root: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    pointerEvent: 'none',
    zIndex: 910,
    '&:focus': { outline: 'none' },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 910,
    backgroundColor: hexToRgbA(COLORS.bgBlack, 0.1),
  },
  loading: { userSelect: 'none', maxWidth: rem(150) },
});
