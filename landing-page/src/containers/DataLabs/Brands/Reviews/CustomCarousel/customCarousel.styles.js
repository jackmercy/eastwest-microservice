import { createUseStyles } from 'react-jss';

import { rem } from '../../../../../utils/jss';
import COLORS from '../../../../../constants/COLORS';
import BREAKPOINTS from '../../../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { position: 'relative', marginTop: rem(64) },
  carousel: {
    padding: 0,
    '& .slick-track, & .slick-slide': {
      display: 'flex',
      height: 'auto',
      justifyContent: 'center',
    },
    '& .slick-dots': { left: 0 },
    '& .slick-prev': { left: 0 },
    '& .slick-next': { right: 0 },
    '& .slick-slide > div': { width: '100%' },
  },
  itemWrapper: { display: 'flex' },
  group: { '& + $group': { marginLeft: rem(75) } },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: rem(256),
    height: rem(256),
    borderRadius: rem(16),
    backgroundColor: COLORS.bgGray02,
  },
  avatar: { width: '100%' },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: 0,
  },
  quotesImage: { display: 'block', width: '100%', maxWidth: rem(48) },
  review: {
    fontWeight: 600,
    fontSize: rem(32),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: rem(80),
  },
  groupButton: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  carouselButton: {
    padding: 0,
    width: rem(48),
    '&.secondary': {
      border: 'none',
      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.15)',
    },
    '& > [class^=icon-]': { fontWeight: 900, fontSize: rem(16) },
    '& + $carouselButton': { marginLeft: rem(16) },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    group: { '& + $group': { marginLeft: rem(32) } },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    root: { marginTop: rem(32) },
    itemWrapper: { display: 'block' },
    group: { '& + $group': { marginLeft: 0, marginTop: rem(32) } },
    avatarWrapper: {
      width: rem(180),
      height: rem(180),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    name: { fontSize: rem(24), lineHeight: rem(32) },
    quotesImage: { maxWidth: rem(40) },
    review: {
      fontSize: rem(18),
      lineHeight: rem(32),
      marginTop: rem(20),
      marginBottom: rem(56),
    },
    carouselButton: {
      '& > [class^=icon-]': { fontSize: rem(14) },
      '&.keepSize.large': { width: rem(40), height: rem(40) },
    },
  },
});
