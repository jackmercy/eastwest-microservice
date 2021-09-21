import { takeLatest, all, put, call } from 'redux-saga/effects';

import { apiUtil, storageUtil } from '../../utils';
import ERROR_CODES from '../../constants/ERROR_CODES';
import { setLoading } from '../ducks/loading.duck';
import { notifyError } from '../ducks/notification.duck';
import {
  callLoginAsCommunityMember,
  setCommunityMember,
  callCreateComment,
} from '../ducks/news.duck';

function* onLoginAsCommunityMember() {
  yield takeLatest(callLoginAsCommunityMember, function* handler({ payload }) {
    try {
      yield put(setLoading(true));
      const member = yield call(apiUtil.communityMembers.createMember, payload);
      const loginResponse = yield call(apiUtil.communityMembers.login, {
        socialId: payload.socialId,
        emailAddress: payload.emailAddress,
      });
      storageUtil.setAuth(JSON.stringify(member));
      storageUtil.setToken(loginResponse.token);
      yield put(setCommunityMember(member));
    } catch (error) {
      yield put(
        notifyError({
          message: ERROR_CODES[error?.code] || 'NEWS.ERROR.LOGIN_FAILED',
        }),
      );
    } finally {
      yield put(setLoading(false));
    }
  });
}

function* onCreateComment() {
  yield takeLatest(
    callCreateComment,
    function* handler({ payload: { data, callback } }) {
      try {
        yield put(setLoading(true));
        const comment = yield call(apiUtil.news.createComment, data.news, data);
        callback(true, comment);
      } catch (error) {
        callback(false);
        console.log(error);
        yield put(
          notifyError({
            message:
              ERROR_CODES[error?.code] || 'NEWS.ERROR.CREATE_COMMENT_FAILED',
          }),
        );
      } finally {
        yield put(setLoading(false));
      }
    },
  );
}

export default function* saga() {
  yield all([onLoginAsCommunityMember(), onCreateComment()]);
}
