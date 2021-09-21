import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import COLORS from '../../../../constants/COLORS';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  detailsWrapper: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: rem(64),
  },
  details: { width: '100%', maxWidth: rem(528) },
  detailsSubTitle: {
    margin: 0,
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    color: COLORS.primary,
  },
  sectionTitle: {},
  detailsDescription: {
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: rem(24),
    marginBottom: 0,
  },
  image: {
    display: 'block',
    boxSizing: 'border-box',
    marginLeft: rem(64),
    flex: 'none',
    maxHeight: rem(426),
    minWidth: rem(200),
    maxWidth: rem(300),
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

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    detailsWrapper: { display: 'block' },
    details: { textAlign: 'center' },
    detailsDescription: {
      fontSize: rem(16),
      lineHeight: rem(24),
      marginTop: 0,
    },
    sectionTitle: { fontSize: rem(32), marginBottom: rem(16) },
    image: { margin: [rem(32), 'auto', 0], maxWidth: rem(275) },
    listKeys: { display: 'none' },
    listKeysNumber: {},
    listKeysLabel: {},
  },
});
