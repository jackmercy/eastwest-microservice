import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  content: { paddingTop: rem(80), paddingBottom: rem(120) },
  title: {
    fontWeight: 900,
    textAlign: 'center',
    fontSize: rem(72),
    lineHeight: rem(88),
    margin: 0,
  },
  listItems: { display: 'flex', marginTop: rem(80) },
  itemLayout: { flex: '25%' },
  itemWrapper: {
    height: '100%',
    boxSizing: 'border-box',
    padding: [rem(32), rem(24)],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.bgWhite,
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.200323)',
    borderRadius: rem(12),
  },
  itemQuotesImage: {
    flex: 'none',
    display: 'block',
    width: '100%',
    maxWidth: rem(48),
  },
  itemReview: {
    flex: '1 1 auto',
    fontSize: rem(16),
    lineHeight: rem(26),
    marginTop: rem(24),
    marginBottom: 0,
  },
  itemGroup: {
    flex: 'none',
    marginTop: rem(72),
    display: 'flex',
    alignItems: 'center',
  },
  itemAvatarImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    overflow: 'hidden',
    width: rem(64),
    height: rem(64),
    marginRight: rem(16),
    borderRadius: rem(8),
    backgroundColor: COLORS.bgGray02,
  },
  itemAvatarImage: { display: 'block', width: '100%', maxWidth: rem(48) },
  itemName: {
    fontWeight: 800,
    fontSize: rem(16),
    lineHeight: rem(24),
    margin: 0,
  },
  itemReward: {
    fontWeight: 700,
    fontSize: rem(14),
    lineHeight: rem(24),
    marginTop: 4,
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    '& > [class^=icon-]': {
      fontSize: rem(16),
      color: COLORS.primary,
      marginRight: rem(8),
    },
  },

  [`@media only screen and (min-width: ${BREAKPOINTS.minLg}px)`]: {
    listItems: { marginLeft: rem(-12), marginRight: rem(-12) },
    itemLayout: { paddingLeft: rem(12), paddingRight: rem(12) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    listItems: { display: 'none' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingTop: rem(40), paddingBottom: rem(40) },
    title: { fontSize: rem(32), lineHeight: rem(40) },
  },
});
