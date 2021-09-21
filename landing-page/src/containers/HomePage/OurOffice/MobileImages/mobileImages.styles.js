import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';

export default createUseStyles({
  carousel: {
    '& .slick-slide > div': { width: '100%' },
  },
  image: { display: 'block', maxHeight: rem(230) },
});
