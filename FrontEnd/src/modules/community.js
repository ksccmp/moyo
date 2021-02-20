import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_CMID = 'community/CHANGE_CMID';
const CHANGE_TITLE = 'community/CHANGE_TITLE';
const CHANGE_CONTENTS = 'community/CHANGE_CONTENTS';
const CHANGE_TYPE = 'community/CHANGE_TYPE';

export const changeCmId = createAction(CHANGE_CMID, cmId => cmId);
export const changeTitle = createAction(CHANGE_TITLE, title => title);
export const changeContents = createAction(
  CHANGE_CONTENTS,
  contents => contents,
);
export const changeType = createAction(CHANGE_TYPE, cmTypeId => cmTypeId);

const initialState = {
  cmId: 0,
  title: '',
  contents: '',
  cmTypeId: '',
};

const community = handleActions(
  {
    [CHANGE_CMID]: (state, { payload: cmId }) =>
      produce(state, draft => {
        draft.cmId = cmId;
      }),
    [CHANGE_TITLE]: (state, { payload: title }) =>
      produce(state, draft => {
        draft.title = title;
      }),
    [CHANGE_CONTENTS]: (state, { payload: contents }) =>
      produce(state, draft => {
        draft.contents = contents;
      }),
    [CHANGE_TYPE]: (state, { payload: cmTypeId }) =>
      produce(state, draft => {
        draft.cmTypeId = cmTypeId;
      }),
  },
  initialState,
);

export default community;
