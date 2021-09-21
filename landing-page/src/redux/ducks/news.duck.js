/* eslint-disable max-len */
import { createAction, handleActions } from 'redux-actions';

const PREFIX = 'NEWS';
const initialStates = {
  member: undefined,
};

export const callLoginAsCommunityMember = createAction(`${PREFIX}/LOGIN_AS_COMMUNITY_MEMBER`);
export const callCreateComment = createAction(`${PREFIX}/CREATE_COMMENT`);
export const callUpdateComment = createAction(`${PREFIX}/UPDATE_COMMENT`);
export const callDeleteComment = createAction(`${PREFIX}/DELETE_COMMENT`);

export const setCommunityMember = createAction(`${PREFIX}/SET_COMMUNITY_MEMBER`);

export const getCommunityMember = (state) => state.news.member;

export default handleActions(
  new Map([
    [setCommunityMember, (state, { payload }) => ({ ...state, member: payload })],
  ]),
  { ...initialStates },
);
