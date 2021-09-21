import { createUseStyles } from 'react-jss';

import COLORS from '../../constants/COLORS';
import { hexToRgbA, rem } from '../../utils/jss';

export default createUseStyles({
  root: {
    top: '10%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate(-50%, -500px)',
    position: 'absolute',
    overflow: 'auto',
    background: COLORS.bgWhite,
    width: `calc(100% - ${rem(32)})`,
    boxSizing: 'border-box',
    maxWidth: rem(640),
    borderRadius: rem(8),
    maxHeight: '80%',
    boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.5s ease-in-out',
    '&:focus': { outline: 'none' },
    '&.ReactModal__Content--after-open': { transform: 'translate(-50%, 0)' },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 900,
    backgroundColor: hexToRgbA(COLORS.bgBlack, 0.1),
    transition: 'background-color .35s linear',
    '&.ReactModal__Overlay--after-open': {
      backgroundColor: hexToRgbA(COLORS.bgBlack, 0.7),
    },
  },
  body: { overflow: 'hidden' },
});
