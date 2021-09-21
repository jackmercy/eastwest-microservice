import { createUseStyles } from 'react-jss';

import COLORS from '../../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { marginBottom: rem(32) },
  input: {
    resize: 'none',
    fontFamily: 'inherit',
    width: '100%',
    lineHeight: 'normal',
    fontWeight: 400,
    boxSizing: 'border-box',
    padding: [rem(12), rem(16)],
    color: COLORS.textBlack01,
    backgroundColor: COLORS.bgWhite,
    border: `1px solid ${hexToRgbA(COLORS.borderGray02, 0.5)}`,
    borderRadius: rem(5),
    '&:focus': { outline: 'none', borderColor: COLORS.primary },
    '&::placeholder': { color: COLORS.textGray },
    '-moz-appearance': 'textfield',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
    '&::-ms-clear, &::-ms-reveal': { display: 'none' },
    '&:-ms-input-placeholder': { color: COLORS.textGray },
    '&:disabled': {
      cursor: 'not-allowed',
      color: COLORS.textGray,
      backgroundColor: COLORS.bgGray02,
    },
  },
  buttonGroup: { textAlign: 'right' },
  button: {
    position: 'relative',
    display: 'inline-block',
    marginTop: rem(28),
    overflow: 'visible',
    '& + $button': { marginLeft: rem(10) },
    '&.primary:not(.disabled).show:hover': { opacity: 1 },
  },
  socialButton: {
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    height: '100%',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
    textAlign: 'inherit',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: {},
    input: { fontSize: rem(14) },
    button: { display: 'inline-block', marginTop: rem(16) },
  },
});
