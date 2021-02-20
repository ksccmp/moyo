import { createAction, handleActions } from 'redux-actions';

const GET_MEMO = 'morePlanMemo/GET_MEMO';

export const storeMemo = createAction(GET_MEMO, planMemoList => planMemoList);

const initialState = {
  planMemoList: [],
};

const morePlanMemo = handleActions(
  {
    [GET_MEMO]: (state, action) => ({
      ...state,
      planMemoList: action.payload,
    }),
  },
  initialState,
);

export default morePlanMemo;
