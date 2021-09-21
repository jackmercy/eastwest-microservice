import { takeLatest, all, put, call } from 'redux-saga/effects';

import { apiUtil } from '../../utils';
import {
  callSendNewProspectRequest,
  callSendNewContactRequest,
  callSendNewApplicationRequest,
} from '../ducks/form.duck';
import { setLoading } from '../ducks/loading.duck';
import { notifyError } from '../ducks/notification.duck';

function* onSendNewProspectRequest() {
  yield takeLatest(
    callSendNewProspectRequest,
    function* handler({ payload: { formValues, callback } }) {
      try {
        yield put(setLoading(true));
        yield call(apiUtil.prospects.createNewRequest, formValues);
        callback(true);
      } catch (error) {
        callback(false);
        yield put(
          notifyError({ message: 'HOMEPAGE.CREATE_PROJECT.MESSAGE.ERROR' }),
        );
      } finally {
        yield put(setLoading(false));
      }
    },
  );
}

function* onSendNewContactRequest() {
  yield takeLatest(
    callSendNewContactRequest,
    function* handler({ payload: { formValues, callback } }) {
      try {
        yield put(setLoading(true));
        yield call(apiUtil.contacts.createNewRequest, formValues);
        callback(true);
      } catch (error) {
        callback(false);
        yield put(
          notifyError({ message: 'HOMEPAGE.CREATE_PROJECT.MESSAGE.ERROR' }),
        );
      } finally {
        yield put(setLoading(false));
      }
    },
  );
}

function* onSendNewApplicationRequest() {
  yield takeLatest(
    callSendNewApplicationRequest,
    function* handler({ payload: { formValues, callback } }) {
      try {
        yield put(setLoading(true));
        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
          if (key === 'resumes') {
            for (let i = 0; i < formValues[key].length; i += 1) {
              formData.append('resumes', formValues[key][i]);
            }
          } else {
            formData.append(key, formValues[key]);
          }
        });
        yield call(apiUtil.vacancies.createNewApplication, formData);
        callback(true);
      } catch (error) {
        callback(false);
        yield put(
          notifyError({ message: 'HOMEPAGE.CREATE_PROJECT.MESSAGE.ERROR' }),
        );
      } finally {
        yield put(setLoading(false));
      }
    },
  );
}

export default function* saga() {
  yield all([
    onSendNewProspectRequest(),
    onSendNewContactRequest(),
    onSendNewApplicationRequest(),
  ]);
}
