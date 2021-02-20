import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeComments, changeEdit } from '../../modules/communityComment';
import axios from '../../api/axios';
import { Grid, TextField, Typography, Button, Paper } from '@material-ui/core';
import styled from 'styled-components';

const FullSizeButton = styled(Button)`
  width: 100%;
  height: 100%;
  padding: 0 !important;
  min-width: 0 !important;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 0.7rem 0.5rem;
  }
`;

const CommentContainer = styled(Grid)`
  &:last-child {
    margin-bottom: 0.8rem;
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const ButtonGrid = styled(Grid)`
  flex-grow: 1;
  text-align: center;
  border-radius: 0.4rem;
  margin: 0.05rem !important;
  background-color: #7369ff;
  color: white;
`;

const CommunityCommentList = ({ cmId, userData }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector(({ communityComment }) => ({
    comments: communityComment.comments,
  }));

  const [writtenComment, setWrittenComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const onChangeComments = useCallback(
    comments => dispatch(changeComments(comments)),
    [dispatch],
  );
  const onChangeEditCallback = useCallback(
    cmCommentId => dispatch(changeEdit(cmCommentId)),
    [dispatch],
  );

  const onChangeEdit = comment => {
    onChangeEditCallback(comment.cmCommentId);
    setEditComment(comment.contents);
  };

  const getCommentList = async () => {
    try {
      return await axios.get(`communityComment/selectAllByCommunity/${cmId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    const result = await getCommentList();
    const resData = result.data.data.map(item => {
      item.edit = false;
      return {
        ...item,
      };
    });
    onChangeComments(resData);
  };

  useEffect(() => {
    getComments();
  }, []);

  const postComment = async commentData => {
    try {
      return await axios.post('communityComment/create', commentData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putComment = async commentData => {
    try {
      return await axios.put('communityComment/update', commentData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async cmCommentId => {
    try {
      return await axios.delete(`communityComment/delete/${cmCommentId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitClick = async () => {
    const commentData = {
      cmId: cmId,
      uid: userData.uid,
      contents: writtenComment,
    };
    if (writtenComment.trim()) {
      const fetchComment = async () => {
        await postComment(commentData);
        getComments();
        setWrittenComment('');
      };
      fetchComment();
    }
  };

  const handleEditClick = async cmCommentId => {
    const commentData = {
      cmCommentId: cmCommentId,
      uid: userData.uid,
      contents: editComment,
    };
    if (editComment.trim()) {
      const fetchEditComment = async () => {
        await putComment(commentData);
        getComments();
      };
      onChangeEditCallback(cmCommentId);
      fetchEditComment();
    }
  };

  const handleEditCancelClick = comment => {
    onChangeEdit(comment);
  };

  const handleDeleteClick = async cmCommentId => {
    await deleteComment(cmCommentId);
    getComments();
  };

  const handleCommentChange = e => {
    setWrittenComment(e.target.value);
  };

  const handleCommentEdit = e => {
    setEditComment(e.target.value);
  };

  return (
    <>
      <div>
        <Grid container style={{ marginBottom: '0.7rem' }}>
          <Grid item xs={10}>
            <StyledTextField
              id="commentInput"
              value={writtenComment}
              onChange={handleCommentChange}
              variant="outlined"
              style={{ width: '97%' }}
            />
          </Grid>
          <Grid item xs={2}>
            <FullSizeButton
              variant="contained"
              color="primary"
              onClick={handleSubmitClick}
            >
              등록
            </FullSizeButton>
          </Grid>
        </Grid>
      </div>

      {comments.map(comment => (
        <CommentContainer container>
          {!comment.edit ? (
            <>
              <Grid item xs={3} container alignItems="center">
                <Typography variant="body2" style={{ fontWeight: '700' }}>
                  {comment.nickname}
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                xs={comment.uid === userData.uid ? 6 : 9}
              >
                <Typography variant="body2">{comment.contents}</Typography>
              </Grid>
              {comment.uid === userData.uid ? (
                <>
                  <ButtonGrid
                    item
                    onClick={() => handleDeleteClick(comment.cmCommentId)}
                  >
                    <Typography variant="caption">삭제</Typography>
                  </ButtonGrid>
                  <ButtonGrid item onClick={() => onChangeEdit(comment)}>
                    <Typography variant="caption">수정</Typography>
                  </ButtonGrid>
                </>
              ) : null}
            </>
          ) : (
            <>
              <Grid item xs={8} style={{ width: '97%' }}>
                <StyledTextField
                  id="commentEdit"
                  value={editComment}
                  placeholder="댓글을 입력해주세요"
                  onChange={handleCommentEdit}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} style={{ padding: '0 0 0 0.2rem' }}>
                <FullSizeButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditClick(comment.cmCommentId)}
                >
                  수정
                </FullSizeButton>
              </Grid>
              <Grid item xs={2} style={{ padding: '0 0 0 0.2rem' }}>
                <FullSizeButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditCancelClick(comment)}
                >
                  취소
                </FullSizeButton>
              </Grid>
            </>
          )}
        </CommentContainer>
      ))}
    </>
  );
};

export default CommunityCommentList;
