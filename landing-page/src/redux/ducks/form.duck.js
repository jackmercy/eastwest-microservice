/* eslint-disable max-len */
import { createAction, handleActions } from 'redux-actions';

const PREFIX = 'FORM';
const initialStates = {};

export const callSendNewProspectRequest = createAction(`${PREFIX}/SEND_NEW_PROSPECT_REQUEST`);
export const callSendNewContactRequest = createAction(`${PREFIX}/SEND_NEW_CONTACT_REQUEST`);
export const callSendNewApplicationRequest = createAction(`${PREFIX}/SEND_NEW_APPLICATION_REQUEST`);

export default handleActions(
  new Map([]),
  { ...initialStates },
);
