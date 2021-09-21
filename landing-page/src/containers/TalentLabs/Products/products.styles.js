import { createUseStyles } from 'react-jss';

import { rem } from '../../../utils/jss';
import COLORS from '../../../constants/COLORS';
import BREAKPOINTS from '../../../constants/BREAKPOINTS';

export default createUseStyles({
  root: { paddingTop: rem(64), paddingBottom: rem(154) },
  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(56),
    lineHeight: rem(72),
    marginTop: 0,
    marginBottom: rem(24),
    transition: 'font-size .5s ease',
  },
  description: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: rem(24),
    lineHeight: rem(40),
    marginTop: 0,
    marginBottom: rem(64),
    transition: 'font-size .5s ease',
  },
  productImage: {
    display: 'block',
    width: '100%',
    maxWidth: rem(1138),
    margin: [0, 'auto', rem(64)],
  },
  howItWorkTitle: { transform: 'translateY(50%)', marginBottom: 0 },
  productSteps: { position: 'relative' },
  productStepsImage: { display: 'block', width: '100%' },
  step: {
    position: 'absolute',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1,
    width: '11%',
    '&::after': {
      content: '""',
      display: 'block',
      borderRadius: 'inherit',
      width: '100%',
      paddingTop: '100%',
    },
  },
  step1: { top: '27.8%', left: '28.7%' },
  step2: { top: '27.8%', left: '47.85%' },
  step3: { top: '27.8%', left: '67.65%' },
  step4: { top: '27.8%', left: '87.3%' },
  tooltip: {
    width: '100%',
    maxWidth: rem(614),
    padding: rem(32),
    backgroundColor: COLORS.bgWhite,
    boxShadow: '2px 4px 25px rgba(0, 0, 0, 0.25)',
    borderRadius: rem(12),
  },
  tooltipTitle: {
    fontWeight: 900,
    fontSize: rem(24),
    lineHeight: rem(32),
    textAlign: 'center',
    marginTop: 0,
    marginBottom: rem(16),
  },
  tooltipImage: { width: '100%', display: 'block' },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxMd}px)`]: {
    root: { paddingTop: rem(32), paddingBottom: rem(16) },
    title: { fontSize: rem(40), lineHeight: rem(48), marginBottom: rem(16) },
    description: { fontSize: rem(20), lineHeight: rem(24) },
    howItWorkTitle: { transform: 'translateY(0)', marginBottom: rem(32) },
    step: { width: '43%' },
    step1: { top: '25.05%', left: '27%' },
    step2: { top: '45.3%', left: '27%' },
    step3: { top: '65.7%', left: '27%' },
    step4: { top: '86.05%', left: '27%' },
  },
  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    title: { fontSize: rem(32), lineHeight: rem(40) },
    description: { fontSize: rem(16) },
    tooltip: { padding: rem(16) },
  },
});
