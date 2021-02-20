import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const CHANGE_BOOL = 'auth/CHANGE_BOOL';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);

export const changeBool = createAction(CHANGE_BOOL, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  userDataId: {
    provider: '',
    socialId: '',
  },
  userData: {
    userToken: '',
    uid: '',
    nickname: '',
    age: '',
    gender: '',
    image: '',
  },
  isLoggedIn: false,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [CHANGE_BOOL]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
  },
  initialState,
);

export default auth;
