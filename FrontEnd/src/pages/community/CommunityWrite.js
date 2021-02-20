import React, { useCallback, useState, useEffect } from 'react';
import BaseAppBar from '../../components/common/BaseAppBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  changeTitle,
  changeContents,
  changeType,
} from '../../modules/community';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import {
  Select,
  Grid,
  Divider,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { openSnackBarAction } from '../../modules/snackBar';
import styled from 'styled-components';

const ContainerGrid = styled(Grid)`
  width: 85% !important;
  background-color: white;
  border-radius: 1rem;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;
const FormTypo = styled(Typography)`
  text-align: left;
  font-weight: 700 !important;
  letter-spacing: -0.05rem !important;
`;

const CommunityWrite = () => {
  const { cmId, cmTypeId, title, contents } = useSelector(({ community }) => ({
    cmId: community.cmId,
    cmTypeId: community.cmTypeId,
    title: community.title,
    contents: community.contents,
  }));
  const userData = useSelector(state => state.auth.userData, []);
  const [communityTypeList, setCommunityTypeList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const pathname = history.location.state.pathname;
  const onChangeTitle = useCallback(title => dispatch(changeTitle(title)), [
    dispatch,
  ]);
  const onChangeContents = useCallback(
    contents => dispatch(changeContents(contents)),
    [dispatch],
  );
  const onChangeType = useCallback(cmTypeId => dispatch(changeType(cmTypeId)), [
    dispatch,
  ]);

  const handleChangeTitle = e => onChangeTitle(e.target.value);
  const handleChangeContents = e => onChangeContents(e.target.value);
  const handleChangeType = e => onChangeType(e.target.value);
  const handleBackClick = () => {
    history.goBack();
  };
  const postCommunity = async communityData => {
    try {
      return await axios.post('community/create', communityData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const putCommunity = async communityData => {
    try {
      return await axios.put('community/update', communityData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitClick = async () => {
    const communityData = {
      uId: userData.uid,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
    };
    if (cmTypeId && title.trim() && contents.trim()) {
      const fetchCommunity = async () => {
        await postCommunity(communityData);
        history.push('/community');
        dispatch(
          openSnackBarAction({
            message: '글이 등록되었습니다.',
            type: 'success',
          }),
        );
      };
      fetchCommunity();
    } else {
      dispatch(
        openSnackBarAction({
          message: '제목, 내용, 타입이 모두 입력되야 합니다.',
          type: 'error',
        }),
      );
    }
  };
  const handlePutClick = async () => {
    const communityData = {
      cmId: cmId,
      uId: userData.uid,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
    };
    const communityDataWithType = {
      cmId: cmId,
      uId: userData.uid,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
      communityType: communityTypeList.find(item => item.cmTypeId === cmTypeId)
        .name,
    };
    if (cmTypeId && title.trim() && contents.trim()) {
      const fetchPutCommunity = async () => {
        await putCommunity(communityData);
        history.push({
          pathname: `/community/communityList/${communityData.cmId}`,
          state: {
            community: communityDataWithType,
            pathname: pathname,
          },
        });
        dispatch(
          openSnackBarAction({
            message: '글이 수정되었습니다.',
            type: 'success',
          }),
        );
      };
      fetchPutCommunity();
    } else {
      dispatch(
        openSnackBarAction({
          message: '제목, 내용, 타입이 모두 입력되야 합니다.',
          type: 'error',
        }),
      );
    }
  };

  const getCommunityTypeList = async () => {
    try {
      return await axios.get('community/selectCommunityType', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCommunityTypeList = async () => {
      const result = await getCommunityTypeList();
      setCommunityTypeList(result.data.data);
    };
    fetchCommunityTypeList();
  }, []);

  return (
    <>
      <BaseAppBar
        text="글 작성하기"
        leftIcon={<ArrowBackIosIcon />}
        rightText="완료"
        leftClick={handleBackClick}
        rightClick={
          history.location.state.communityPutCheck
            ? handlePutClick
            : handleSubmitClick
        }
      />
      <ContainerGrid container direction="column">
        <Grid item container style={{ padding: '1rem' }}>
          <Grid item container xs={2} alignItems="center">
            <FormTypo>타입</FormTypo>
          </Grid>
          <Grid item xs={10}>
            <Select
              select="true"
              label="타입"
              fullWidth
              align="center"
              value={cmTypeId}
              onChange={handleChangeType}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>타입을 선택해주세요</em>
              </MenuItem>
              {communityTypeList.map(item => (
                <MenuItem key={item.cmTypeId} value={item.cmTypeId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item container style={{ padding: '0.5rem 1rem' }}>
          <Grid item container xs={2} alignItems="center">
            <FormTypo>제목</FormTypo>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="titleInput"
              value={title}
              fullWidth
              onChange={handleChangeTitle}
            />
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-multiline-static"
            placeholder="내용을 입력해주세요"
            multiline
            fullWidth
            rows="10"
            value={contents}
            onChange={handleChangeContents}
            variant="outlined"
            style={{ padding: '1rem' }}
          />
        </Grid>
      </ContainerGrid>
    </>
  );
};

export default CommunityWrite;
