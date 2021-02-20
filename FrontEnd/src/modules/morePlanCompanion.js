import { createAction, handleActions } from 'redux-actions';

const GET_COMPANION = 'morePlanCompanion/GET_COMPANION';

export const storeCompanion = createAction(
  GET_COMPANION,
  planCompanionList => planCompanionList,
);

const initialState = {
  planCompanionList: [],
};

const morePlanCompanion = handleActions(
  {
    [GET_COMPANION]: (state, action) => ({
      ...state,
      planCompanionList: action.payload,
    }),
  },
  initialState,
);

export default morePlanCompanion;
