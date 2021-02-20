import React, { useState, useEffect } from 'react';
import BaseAppBar from './BaseAppBar';
import { Dialog, Slide, Grid, TextField, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getAgeList, getGenderList } from '../../api/commonData';
import axios from '../../api/axios';

// 1. const [openProfile, setOpenProfile] = useState(false) 를 쓰려는 페이지에 정의
// 2. 클릭시 이벤트를 발생시킬 컴포넌트에 클릭 이벤트 추가 onClick={() => setOpenProfile(true)}
// 3. {otherUserId && <OtherProfile openProfile={openProfile} setOpenProfile={setOpenProfile} otherUserId={otherUserId} />}
// 프로퍼티는 요렇게 3개 otherUserId 에는 보려고 하는 유저의 Id 를 넣어줄 것
// id 가 있을때만 나오도록 조건문을 주면 좀 더 안전합니다.
// 설명이 그지 같으니까 TripCompanionSet.js 를 참고해 주세요

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const OtherProfile = props => {
  const openProfile = props.openProfile;
  const setOpenProfile = props.setOpenProfile;
  const otherUserId = props.otherUserId;
  const [isFinish, setIsFinish] = useState(false);
  const [image, setImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const useStyles = makeStyles(theme => ({
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  }));

  const classes = useStyles();

  const handleClose = () => {
    setOpenProfile(false);
  };

  const getOtherUserInfo = async () => {
    try {
      return await axios.get(`user/selectOne/${otherUserId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resAge = getAgeList();
      const resGender = getGenderList();
      const otherUserInfo = await getOtherUserInfo();
      const userData = otherUserInfo.data.data;
      setAge(resAge.find(item => item.value === String(userData.age)).name);
      setGender(
        resGender.find(
          item => item.value === String(userData.gender).toUpperCase(),
        ).name,
      );
      setImage(userData.image);
      setNickname(userData.nickname);
    };
    fetchData();
  }, [otherUserId]);

  return (
    <Dialog
      fullScreen
      open={openProfile}
      onClose={handleClose}
      TransitionComponent={Transition}
      style={{
        width: 'inherit',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BaseAppBar
        style={{ flexGrow: '0' }}
        text={`${nickname}님의 프로필`}
        leftIcon={<ArrowBackIosIcon onClick={handleClose} />}
      />
      <Grid
        container
        direction="column"
        justify="center"
        style={{
          width: 'inherit',
          margin: '0px',
          flexGrow: '1',
        }}
      >
        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <Avatar alt={nickname} src={image} className={classes.large} />
        </Grid>
        <Grid item container>
          <Grid item xs={3} />
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs={6}
            style={{ margin: '0px' }}
          >
            <Grid item style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Nickname"
                defaultValue={nickname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Age"
                value={age}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                id="standard-disabled"
                label="Gender"
                defaultValue={gender}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OtherProfile;
