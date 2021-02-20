import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../api/axios';
import moment from '../../api/moment';
import styled from 'styled-components';
import BaseAppBar from '../../components/common/BaseAppBar';
import OtherProfile from '../../components/common/OtherProfile';
import AlertDialog from '../../components/common/AlertDialog';
import { openSnackBarAction } from '../../modules/snackBar';
import { navigationSelect } from '../../modules/baseNavigation';
import {
  Switch,
  Button,
  Divider,
  Typography,
  Avatar,
  Paper,
  Grid,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const InnerContainerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-color: white;
  border-radius: 1rem;
`;
const ContentsGrid = styled(Grid)`
  padding: 1rem !important;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 1rem !important;
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  min-width: 3.5rem;
  min-height: 3.5rem;
`;

const StyledDivider = styled(Divider)`
  margin-top: 0.8rem !important;
  margin-bottom: 0.8rem !important;
  background-color: black !important;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  & > .MuiTypography-body1 {
    font-size: 0.7rem;
    text-align: left;
    margin-bottom: -0.5rem;
  }
`;

const AccompanyListDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [boardData, setBoardData] = useState(history.location.state.board);
  const [isModify, setIsModify] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setIsModify(history.location.state.board.uid === userData.uid);
  }, []);

  const convertAgeToStr = age => {
    age = Number(age);
    return age === 0 ? '무관' : Number(age) + '0대' + (age === '5' ? '+' : '');
  };
  const convertWantAge = ageArrStr =>
    String(ageArrStr)
      .split('|')
      .map(age => convertAgeToStr(age))
      .join(' / ');

  const convertGenderToStr = gender => {
    switch (String(gender).toUpperCase()) {
      case 'M':
        return '남성';
      case 'F':
        return '여성';
      default:
        return '무관';
    }
  };

  const saveToggleChangeBoard = async changedToggle => {
    try {
      return axios.put(
        'accompanyBoard/updateDeadlineToggle',
        {
          acBoardId: boardData.acBoardId,
          deadlineToggle: changedToggle,
        },
        { headers: { userToken: localStorage.token } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoard = async () => {
    try {
      return axios.delete(`accompanyBoard/delete/${boardData.acBoardId}`, {
        headers: { userToken: localStorage.token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    history.push({
      pathname: history.location.state.prevpath,
    });
  };

  const handleDialogConfirm = async () => {
    setOpenDialog(false);
    await deleteBoard().then(() => {
      dispatch(
        openSnackBarAction({
          message: '동행글이 삭제되었습니다.',
          type: 'success',
        }),
      );
      handleGoBack();
    });
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleMoveChat = () => {
    dispatch(navigationSelect('DM'));
    history.push(`/dmroom/${boardData.uid}`);
  };

  const handleModifyAccompany = () => {
    history.push({
      pathname: '/more/accompanyWrite',
      state: {
        nowpath: history.location.pathname,
        prevpath: history.location.state.prevpath,
        board: boardData,
      },
    });
  };
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleShowProfile = () => {
    setOpenProfile(true);
  };

  const ModifyStateContainer = () => {
    if (boardData.validDate && boardData.deadlineToggle === 'n') {
      return <></>;
    } else {
      return (
        <Grid item style={{ width: '100%' }}>
          {boardData.validDate ? (
            <Alert variant="filled" severity="success">
              마감된 동행 글입니다.
            </Alert>
          ) : (
            <Alert
              variant="filled"
              severity="warning"
              style={{ color: 'black', fontWeight: '700' }}
            >
              기간이 지난 동행 글입니다.
            </Alert>
          )}
        </Grid>
      );
    }
  };

  const NameContainer = () => {
    const handleChangeToggle = () => {
      if (!boardData.validDate) {
        return;
      }
      const fetchSaveToggle = async () => {
        const changedToggle = boardData.deadlineToggle === 'n' ? 'y' : 'n';
        setBoardData({
          ...boardData,
          deadlineToggle: changedToggle,
        });
        await saveToggleChangeBoard(changedToggle);
      };
      fetchSaveToggle();
    };
    return (
      <Grid item container alignItems="flex-end">
        <Grid item xs={isModify ? 8 : 12}>
          <Typography variant="subtitle1">{boardData.nickname}</Typography>
        </Grid>
        {isModify && (
          <Grid item xs={4}>
            <CustomFormControlLabel
              value="top"
              control={
                <Switch
                  checked={boardData.deadlineToggle === 'y'}
                  onChange={handleChangeToggle}
                  disable={String(!boardData.validDate)}
                />
              }
              label="마감하기"
              labelPlacement="top"
            />
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        style={{ height: '100%' }}
      >
        <BaseAppBar
          text="상세보기"
          leftIcon={<ArrowBackIosIcon />}
          leftClick={handleGoBack}
          rightIcon={isModify ? <BorderColorIcon /> : null}
          rightClick={isModify ? handleModifyAccompany : null}
          rightExtraIcon={isModify ? <DeleteIcon /> : null}
          rightExtraClick={isModify ? handleDeleteClick : null}
          style={{ flexGrow: '0' }}
        />
        <Grid
          item
          style={{
            width: '85%',
            margin: '0 auto',
            marginTop: '1rem',
          }}
        >
          {isModify && <ModifyStateContainer />}
        </Grid>

        <InnerContainerGrid item>
          <Grid container direction="column" justify="flex-start">
            <Grid item style={{ padding: '0.7rem 1rem 0.2rem 1rem' }}>
              <Typography variant="subtitle2" color="secondary">
                {boardData.type}
              </Typography>
            </Grid>
            <Grid item style={{ padding: '0 1rem 0.5rem 1rem' }}>
              <Typography variant="h5">{boardData.title}</Typography>
            </Grid>
            <Grid item container style={{ padding: '0 1rem' }}>
              <CenterGrid item xs={3}>
                <StyledAvatar
                  src={boardData.image}
                  onClick={handleShowProfile}
                />
              </CenterGrid>
              <Grid
                item
                container
                direction="column"
                xs={9}
                style={{ paddingLeft: '0.5rem' }}
              >
                <NameContainer />
                <Grid item>
                  <Typography variant="body2">
                    {convertGenderToStr(boardData.gender)} /{' '}
                    {convertAgeToStr(boardData.age)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {moment.convertDate(boardData.startDate)} ~{' '}
                    {moment.convertDate(boardData.endDate)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <StyledDivider variant="middle" />

          <Grid container direction="column" justify="flex-start">
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="subtitle2" style={{ paddingLeft: '1rem' }}>
                  이런 사람이면 더 좋겠어요!
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ marginLeft: '1.5rem' }}>
                  - 연령대: {convertWantAge(boardData.wantAge)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ marginLeft: '1.5rem' }}>
                  - 성별 : {convertGenderToStr(boardData.wantGender)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <StyledDivider variant="middle" />

          <ContentsGrid item>
            <Paper elevation={0}>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                {boardData.contents}
              </Typography>
            </Paper>
          </ContentsGrid>
        </InnerContainerGrid>
        {!isModify ? (
          <Grid
            item
            style={{ width: '85%', margin: '0 auto', marginBottom: '1rem' }}
          >
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleMoveChat}
            >
              DM 보내기
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <OtherProfile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        otherUserId={boardData.uid}
      />
      <AlertDialog
        open={openDialog}
        title="일정 삭제"
        contents="정말 삭제하시겠습니까?"
        onConfirm={handleDialogConfirm}
        onClose={handleDialogClose}
      ></AlertDialog>
    </>
  );
};

export default AccompanyListDetail;
