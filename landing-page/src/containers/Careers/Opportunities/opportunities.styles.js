import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  sectionTitle: { marginTop: rem(160) },
  description: { fontSize: rem(24), lineHeight: rem(40) },
  tabs: {
    display: 'flex',
    overflow: 'auto',
    listStyle: 'none',
    margin: [rem(40), 0, 0],
    padding: 0,
  },
  tab: {
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: rem(16),
    lineHeight: rem(40),
    padding: [0, rem(8)],
    transition: 'margin .3s ease',
    position: 'relative',
    whiteSpace: 'nowrap',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      left: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
      transition: 'width .5s ease',
      borderRadius: rem(4),
      height: rem(2),
    },
    '& + $tab': { marginLeft: rem(32) },
    '&:hover': { color: COLORS.primary, '&::after': { width: '100%' } },
    '&.active': { color: COLORS.primary, '&::after': { width: '100%' } },
  },
  content: {
    marginTop: rem(32),
    paddingRight: rem(56),
    overflow: 'auto',
    maxHeight: rem(890),
  },
  vacancy: { '& + $vacancy': { marginTop: rem(32) } },
  vacancyTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: rem(40),
    lineHeight: rem(56),
    margin: 0,
    textDecoration: 'none',
    cursor: 'pointer',
    color: COLORS.textBlack01,
    '&:hover': { color: COLORS.primary },
    '& > [class^=icon-]': {
      color: 'inherit',
      marginLeft: rem(12),
      fontSize: rem(15),
      lineHeight: 'inherit',
    },
  },
  vacancyDescription: {
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(16),
    marginBottom: 0,
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    sectionTitle: { marginTop: rem(64) },
    description: {
      textAlign: 'center',
      fontSize: rem(16),
      lineHeight: rem(24),
    },
    tabs: { marginTop: rem(32) },
    content: { maxHeight: rem(350) },
    vacancy: { '& + $vacancy': { marginTop: rem(24) } },
    vacancyTitle: {
      fontSize: rem(16),
      lineHeight: rem(24),
      '& > [class^=icon-]': { fontSize: rem(8) },
    },
    vacancyDescription: { fontSize: rem(12), lineHeight: rem(16) },
  },
});
