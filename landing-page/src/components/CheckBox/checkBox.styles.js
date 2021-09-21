import { createUseStyles } from 'react-jss';
import COLORS from '../../constants/COLORS';

import { hexToRgbA, rem } from '../../utils/jss';

export default createUseStyles({
  root: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: rem(50),
    maxWidth: '100%',
    fontSize: rem(12),
    lineHeight: rem(16),
    color: COLORS.textGray,
    fontWeight: 500,
  },
  input: {
    margin: 0,
    padding: 0,
    height: 'initial',
    width: 'initial',
    marginBottom: 0,
    display: 'none',
    '&:checked + $label': {
      '&::before': {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
      },
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: rem(1),
        left: rem(5),
        width: rem(3),
        height: rem(8),
        border: `solid ${COLORS.borderWhite}`,
        borderWidth: [0, rem(1.5), rem(1.5), 0],
        transform: 'rotate(45deg)',
      },
    },
    '&:disabled + $label': {
      cursor: 'default',
      color: hexToRgbA(COLORS.textGray, 0.7),
      '&::before': { cursor: 'not-allowed' },
    },
    '&:disabled:checked + $label': {
      '&::before': {
        backgroundColor: hexToRgbA(COLORS.primary, 0.7),
        borderColor: 'transparent',
      },
    },
  },
  label: {
    position: 'relative',
    cursor: 'pointer',
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: 'inherit',
    userSelect: 'none',
    '&::before': {
      content: '""',
      '-webkit-appearance': 'none',
      backgroundColor: 'transparent',
      border: `1px solid ${hexToRgbA(COLORS.borderBlack01, 0.2)}`,
      padding: rem(6),
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'top',
      borderRadius: rem(3),
      cursor: 'pointer',
      marginRight: rem(8),
    },
  },
});
