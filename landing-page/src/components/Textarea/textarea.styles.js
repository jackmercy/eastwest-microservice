import { createUseStyles } from 'react-jss';

import { rem } from '../../utils/jss';

export default createUseStyles({
  root: { lineHeight: '0px' },
  input: {
    padding: [rem(12), rem(16)],
    resize: 'vertical',
    '&.large': { height: 'auto', minHeight: rem(147), maxHeight: rem(320) },
    '&.medium': { height: 'auto', minHeight: rem(147), maxHeight: rem(300) },
    '&.small': { height: 'auto', minHeight: rem(140), maxHeight: rem(280) },
  },
});
