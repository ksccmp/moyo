import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const ACC_NATION = 'accompany/LOC_NATION';
const ACC_CITY = 'accompany/LOC_CITY';
const ACC_DATE = 'accompany/ACC_DATE';

export const accompanyNation = createAction(ACC_NATION, nation => nation);
export const accompanyCity = createAction(ACC_CITY, city => city);
export const accompanyDate = createAction(ACC_DATE, date => date);

const initialState = {
  nation: {
    code: 0,
    name: '',
  },
  city: {
    code: 0,
    name: '',
  },
  date: '',
};

const location = handleActions(
  {
    [ACC_NATION]: (state, { payload: nation }) =>
      produce(state, draft => {
        draft.nation = nation;
      }),
    [ACC_CITY]: (state, { payload: city }) =>
      produce(state, draft => {
        draft.city = city;
      }),
    [ACC_DATE]: (state, { payload: date }) =>
      produce(state, draft => {
        draft.date = date;
      }),
  },
  initialState,
);

export default location;
