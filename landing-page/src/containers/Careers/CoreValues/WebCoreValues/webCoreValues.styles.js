import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';

export default createUseStyles({
  slider: {
    '& .slick-track, & .slick-slide': {
      display: 'flex',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .slick-dots': { left: 0 },
    '& .slick-prev': { left: 0 },
    '& .slick-next': { right: 0 },
    '& .slick-slide > div': { width: '100%' },
  },
  detailsWrapper: {
    display: 'inline-flex !important',
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: [0, rem(4)],
    '&:focus': { outline: 'none' },
  },
  details: { width: '100%', maxWidth: rem(528) },
  detailsSubTitle: {
    margin: 0,
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    color: COLORS.primary,
  },
  detailsDescription: {
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: 0,
  },
  image: {
    display: 'block',
    boxSizing: 'border-box',
    marginLeft: '5%',
    flex: 'none',
    maxHeight: rem(426),
    minWidth: rem(280),
    maxWidth: rem(376),
  },
  listKeys: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: rem(84),
  },
  listKeysItem: {
    display: 'flex',
    flex: 1,
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:nth-child(2), &:nth-child(3)': { padding: [0, rem(8)] },
    '&.active': { color: COLORS.primary },
  },
  listKeysNumber: {
    marginTop: rem(-5),
    marginBottom: 0,
    fontWeight: 900,
    fontSize: rem(32),
    lineHeight: rem(40),
  },
  listKeysLabel: {
    margin: [0, 0, 0, rem(20)],
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(32),
  },
});
