import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_COMMENTS = 'communityComment/CHANGE_COMMENTS';
const CHANGE_EDIT = 'communityComment/CHANGE_EDIT';

export const changeComments = createAction(
  CHANGE_COMMENTS,
  comments => comments,
);
export const changeEdit = createAction(CHANGE_EDIT, cmCommentId => cmCommentId);

const initialState = {
  comments: [
    {
      cmCommentId: null,
      cmId: null,
      uId: null,
      contents: '',
      nickname: '',
      registerDate: '',
      updateDate: '',
      edit: false,
    },
  ],
};

const communityComment = handleActions(
  {
    [CHANGE_COMMENTS]: (state, { payload: comments }) =>
      produce(state, draft => {
        draft.comments = comments;
      }),
    [CHANGE_EDIT]: (state, { payload: cmCommentId }) =>
      produce(state, draft => {
        const comment = draft.comments.find(
          comment => comment.cmCommentId === cmCommentId,
        );
        comment.edit = !comment.edit;
      }),
  },
  initialState,
);

export default communityComment;
