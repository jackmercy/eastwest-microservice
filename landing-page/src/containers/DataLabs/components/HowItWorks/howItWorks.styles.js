import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  content: { paddingTop: rem(80), paddingBottom: rem(46) },
  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    margin: 0,
    transition: 'font-size .5s ease',
  },
  description: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    maxWidth: rem(1270),
    margin: [rem(24), 'auto', 0],
    transition: 'font-size .5s ease',
  },
  listItems: { marginTop: rem(120) },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& + $itemWrapper': { marginTop: rem(130) },
  },
  itemImage: {
    flex: 'none',
    alignSelf: 'baseline',
    display: 'block',
    maxWidth: rem(430),
    maxHeight: rem(350),
    transition: 'max-width .3s ease',
  },
  itemInfoWrapper: { display: 'flex', marginRight: rem(16) },
  itemIcon: {
    flex: 'none',
    width: '100%',
    maxWidth: rem(64),
    marginRight: rem(36),
    alignSelf: 'baseline',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: rem(40),
    lineHeight: rem(64),
    margin: 0,
    textTransform: 'uppercase',
  },
  itemDescription: {
    width: '100%',
    maxWidth: rem(520),
    fontSize: rem(24),
    lineHeight: rem(32),
    marginTop: rem(16),
    marginBottom: 0,
    transition: 'max-width .3s ease',
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    itemWrapper: { '& + $itemWrapper': { marginTop: rem(56) } },
    itemImage: { maxWidth: rem(300) },
    itemIcon: { maxWidth: rem(40), marginRight: rem(16) },
    itemTitle: { fontSize: rem(28), lineHeight: rem(32) },
    itemDescription: { fontSize: rem(20), lineHeight: rem(24) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    content: { paddingTop: rem(40), paddingBottom: rem(40) },
    title: { fontSize: rem(32), lineHeight: rem(40) },
    description: { fontSize: rem(16), lineHeight: rem(24), marginTop: rem(16) },
    listItems: { marginTop: rem(40) },
    itemWrapper: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      '& + $itemWrapper': { marginTop: rem(48) },
    },
    itemImage: { maxWidth: rem(180), alignSelf: 'center' },
    itemInfoWrapper: { marginTop: rem(24) },
    itemIcon: { maxWidth: rem(40) },
    itemTitle: { fontSize: rem(20), lineHeight: rem(32) },
    itemDescription: {
      marginTop: rem(8),
      fontSize: rem(14),
      lineHeight: rem(20),
    },
  },
});
