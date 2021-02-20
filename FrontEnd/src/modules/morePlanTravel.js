import { createAction, handleActions } from 'redux-actions';

const GET_SCHEDULE = 'morePlanTravel/GET_SCHEDULE';

export const storeSchedule = createAction(
  GET_SCHEDULE,
  planTravelList => planTravelList,
);

const initialState = {
  planTravelList: [],
};

const morePlanTravel = handleActions(
  {
    [GET_SCHEDULE]: (state, action) => ({
      ...state,
      planTravelList: action.payload,
    }),
  },
  initialState,
);

export default morePlanTravel;
