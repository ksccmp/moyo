import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const NAV_SELECT = 'navigation/NAV_SELECT';

export const navigationSelect = createAction(NAV_SELECT, select => select);

const initialState = {
  select: 'accompany',
};

const baseNavigation = handleActions(
  {
    [NAV_SELECT]: (state, { payload: select }) =>
      produce(state, draft => {
        draft.select = select;
      }),
  },
  initialState,
);

export default baseNavigation;
