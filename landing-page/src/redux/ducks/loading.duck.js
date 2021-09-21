import { createAction, handleActions } from 'redux-actions';

const PREFIX = 'LOADING';
const initialStates = { status: false, counter: 0 };

export const setLoading = createAction(`${PREFIX}/SET_LOADING`);

export const getLoading = (state) => state.loading.status;

export default handleActions(
  new Map([
    [
      setLoading,
      (state, { payload: open }) => {
        const counter = open ? state.counter + 1 : state.counter - 1;
        const status = counter > 0 ? true : open;

        return { ...state, counter, status };
      },
    ],
  ]),
  { ...initialStates },
);
