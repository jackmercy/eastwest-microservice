import { createUseStyles } from 'react-jss';

import COLORS from '../../../constants/COLORS';
import { hexToRgbA, rem } from '../../../utils/jss';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  content: {
    paddingTop: rem(40),
    paddingBottom: rem(200),
    maxWidth: rem(696),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: rem(-8),
  },
  formInput: { width: '100%', padding: rem(8), boxSizing: 'border-box' },
  form30: { flex: '30%', maxWidth: '30%' },
  form50: { flex: '50%', maxWidth: '50%' },
  form70: { flex: '70%', maxWidth: '70%' },
  formInputPhoneLabel: { visibility: 'hidden' },
  formCheckBox: {
    display: 'flex',
    width: '100%',
    maxWidth: `calc(100% - ${rem(16)})`,
    marginTop: rem(32),
  },
  formTerms: {
    fontWeight: 600,
    fontSize: rem(12),
    lineHeight: rem(16),
    color: COLORS.primary,
    cursor: 'pointer',
  },
  formButton: {
    width: '100%',
    maxWidth: `calc(100% - ${rem(16)})`,
    marginTop: rem(32),
  },
  modal: { maxWidth: rem(1440), top: '5%', maxHeight: '90%' },
  avatar: {
    width: '100%',
    maxWidth: `calc(100% - ${rem(16)})`,
    textAlign: 'center',
  },
  avatarPreviewWrapper: {
    borderRadius: '50%',
    overflow: 'hidden',
    width: rem(180),
    height: rem(180),
    margin: [0, 'auto', rem(24)],
    backgroundColor: COLORS.bgGray02,
    position: 'relative',
  },
  avatarDefault: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > [class^=icon-]': { fontSize: rem(32), color: COLORS.textGray },
  },
  avatarPreview: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  avatarButton: { marginBottom: rem(32) },
  inputHidden: { display: 'none' },
  resume: {
    width: '100%',
    maxWidth: `calc(100% - ${rem(16)})`,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    marginTop: rem(16),
  },
  resumeLabel: {
    fontWeight: 600,
    fontSize: rem(18),
    lineHeight: rem(24),
    margin: 0,
    '&::after': {
      fontSize: 'inherit',
      content: '" *"',
      color: '#C80030',
      verticalAlign: 'top',
    },
  },
  resumeButton: {
    flex: 'none',
    padding: 0,
    width: rem(48),
    borderRadius: '50%',
    marginLeft: rem(8),
    '&.secondary': { borderColor: hexToRgbA(COLORS.borderGray02, 0.5) },
    '& > [class^=icon-]': { fontSize: rem(18) },
  },
  listResumes: {
    padding: 0,
    width: '100%',
    maxWidth: `calc(100% - ${rem(16)})`,
    marginTop: rem(16),
    marginBottom: 0,
  },
  resumeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& + $resumeItem': { marginTop: rem(16) },
  },
  resumeName: {
    fontWeight: 600,
    fontSize: rem(18),
    lineHeight: rem(24),
    width: '90%',
    color: COLORS.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  resumeRemoveButton: {
    width: rem(48),
    textAlign: 'center',
    marginLeft: rem(16),
    '& > [class^=icon-]': { cursor: 'pointer', fontSize: rem(18) },
    '&:hover > [class^=icon-]': { color: COLORS.primary },
  },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    content: { paddingTop: rem(32), paddingBottom: rem(80) },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    form: { margin: 0 },
    formInput: { padding: 0, '& + $formInput': { marginTop: rem(16) } },
    form30: { flex: '100%', maxWidth: '100%' },
    form50: { flex: '100%', maxWidth: '100%' },
    form70: { flex: '100%', maxWidth: '100%' },
    formInputPhoneLabel: { display: 'none' },
    formCheckBox: { maxWidth: '100%', marginTop: rem(16) },
    formButton: { maxWidth: '100%' },
    avatar: { maxWidth: '100%' },
    avatarPreviewWrapper: { width: rem(120), height: rem(120) },
    resume: { maxWidth: '100%' },
    resumeLabel: { fontSize: rem(14), lineHeight: rem(16) },
    resumeButton: {
      width: rem(32),
      '& > [class^=icon-]': { fontSize: rem(16) },
    },
    listResumes: { maxWidth: '100%' },
    resumeName: { fontSize: rem(14), lineHeight: rem(20) },
    resumeRemoveButton: {
      width: rem(32),
      '& > [class^=icon-]': { cursor: 'pointer', fontSize: rem(16) },
    },
  },
});
