import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const ACC_FILTER_GENDER = 'accompany/FILTER_GENDER';
const ACC_FILTER_AGE = 'accompany/FILTER_AGE';
const ACC_FILTER_TYPE = 'accompany/FILTER_TYPE';

export const accompanyFilterGender = createAction(
  ACC_FILTER_GENDER,
  gender => gender,
);
export const accompanyFilterAge = createAction(ACC_FILTER_AGE, age => age);
export const accompanyFilterType = createAction(ACC_FILTER_TYPE, type => type);

const initialState = {
  gender: 'N',
  age: {
    10: false,
    20: false,
    30: false,
    40: false,
    50: false,
  },
  type: { 식사: false, 관광: false, 카페: false, 투어: false },
};

const filter = handleActions(
  {
    [ACC_FILTER_GENDER]: (state, { payload: gender }) =>
      produce(state, draft => {
        draft.gender = gender;
      }),
    [ACC_FILTER_AGE]: (state, { payload: age }) => {
      return produce(state, draft => {
        draft.age = age;
      });
    },
    [ACC_FILTER_TYPE]: (state, { payload: type }) =>
      produce(state, draft => {
        draft.type = type;
      }),
  },
  initialState,
);

export default filter;
