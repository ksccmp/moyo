import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'planDate/CHANGE_FIELD';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  selectedDate: '',
};

const planDate = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
  },
  initialState,
);

export default planDate;
