import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';

export default createUseStyles({
  root: {
    '@global': {
      ol: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        listStyleType: 'none',
        counterReset: 'parent-counter',
        '& li': {
          counterIncrement: 'parent-counter',
          '& + li': { marginTop: rem(32) },
          '&::before': {
            content: 'counters(parent-counter, ".")"."',
            display: 'inline-block',
            fontWeight: 'bold',
            fontSize: rem(24),
            lineHeight: rem(32),
            textAlign: 'center',
            marginRight: rem(8),
          },
          '& h1': {
            fontSize: rem(24),
            lineHeight: rem(32),
            fontWeight: 'bold',
            display: 'inline',
            margin: 0,
          },
        },
        '& ol': {
          marginTop: rem(16),
          '& li': {
            fontWeight: 'normal',
            fontSize: rem(16),
            lineHeight: rem(24),
            '& + li': { marginTop: rem(16) },
            '&::before': {
              fontWeight: 'normal',
              fontSize: rem(16),
              lineHeight: rem(24),
            },
          },
          '& ol': { paddingLeft: rem(24) },
        },
      },
      p: { fontWeight: 'normal', fontSize: rem(16), lineHeight: rem(24) },
      a: { textDecoration: 'none', color: COLORS.primary },
    },
  },
});
