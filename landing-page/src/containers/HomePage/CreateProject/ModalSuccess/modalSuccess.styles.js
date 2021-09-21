import { createUseStyles } from 'react-jss';

import { rem } from '../../../../utils/jss';
import BREAKPOINTS from '../../../../constants/BREAKPOINTS';

export default createUseStyles({
  modal: { maxWidth: rem(833) },
  modalContent: { textAlign: 'center', padding: [rem(48), rem(32)] },
  modalImage: {
    display: 'block',
    maxWidth: rem(183),
    margin: [0, 'auto', rem(32)],
  },
  modalText: { margin: 0, fontSize: rem(24), lineHeight: rem(32) },
  modalButton: { marginTop: rem(32), minWidth: rem(160) },

  [`@media only screen and (max-width: ${BREAKPOINTS.maxSm}px)`]: {
    modalContent: { padding: [rem(32), rem(16)] },
    modalImage: { maxWidth: rem(123), marginBottom: rem(26) },
    modalText: { fontSize: rem(14), lineHeight: rem(20) },
    modalButton: { marginTop: rem(26), minWidth: rem(130) },
  },
});
