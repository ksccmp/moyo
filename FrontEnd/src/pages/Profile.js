import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../api/axios';
import { getAgeList, getGenderList } from '../api/commonData';
import { changeField, changeBool } from '../modules/auth';
import BaseAppBar from '../components/common/BaseAppBar';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  Avatar,
  Badge,
  Grid,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { openSnackBarAction } from '../modules/snackBar';

const Profile = props => {
  const jwtDecode = require('jwt-decode');
  const dispatch = useDispatch();
  const history = useHistory();

  const [ageList, setAgeList] = useState([]);
  const [genderList, setGenderList] = useState([]);

  const userData = useSelector(state => state.auth.userData);

  const prevPath = props.location.state.prevPath;
  const userSocialId = props.location.state.userSocialId;

  let userImage = props.location.state.userProfileImage;
  const [tempUserImage, setTempUserImage] = useState(userImage);
  const [imageFile, setImageFile] = useState('');
  const [tempImageName, setTempImageName] = useState('');

  let userNickname = props.location.state.userNickname;
  const [userNicknameOut, setUserNicknameOut] = useState(userNickname);

  let userAge = props.location.state.userAgeRange;
  let userAgeRangeFirst = '';
  if (userAge !== undefined && typeof userAge === 'string') {
    userAgeRangeFirst = userAge.charAt(0);
  } else if (typeof userAge === 'number') {
    userAgeRangeFirst = String(userAge);
  }
  const [age, setAge] = useState('' || userAgeRangeFirst);

  let userGender = props.location.state.userGender;
  let userGenderFirst = '';
  if (userGender !== undefined) {
    userGenderFirst = userGender.charAt(0).toUpperCase();
  }
  const [gender, setGender] = useState('' || userGenderFirst);

  const [nickNameError, setNickNameError] = useState(false);
  const [nickNamePlaceHolder, setNickNamePlaceHolder] = useState(
    '닉네임을 입력해주세요!',
  );
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const useStyles = makeStyles(theme => ({
    multilineColor: {
      color: 'black',
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  }));

  const classes = useStyles();

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const handleBackIcon = () => {
    if (isMe) {
      history.push('/more');
    } else {
      history.goBack();
    }
  };

  const handleProfileImage = () => {
    setOpenDialog(true);
    setUserDialogImage(tempUserImage);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeNickname = event => {
    setUserNicknameOut(event.target.value);
    setNickNameError(false);
  };

  const handleChangeAge = event => {
    setAge(event.target.value);
  };

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  useEffect(() => {
    setAgeList(getAgeList());
    setGenderList(getGenderList());
  }, []);

  const postRequest = async () => {
    try {
      return await axios.post('user/register', {
        provider: 0,
        socialId: userSocialId,
        nickname: userNicknameOut,
        age: age,
        gender: gender,
        image: tempUserImage,
        imageName: tempImageName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postImageRequest = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      return await axios.post('user/postImage', formData, {
        params: { imageName: tempImageName },
        headers: {
          userToken: userData.userToken,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putRequest = async () => {
    try {
      return await axios.put(
        'user/update',
        {
          nickname: userNicknameOut,
          age: age,
          gender: gender,
          image: tempUserImage,
          imageName: tempImageName,
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async () => {
    const resData = await postRequest();
    if (resData.data.status) {
      const jwtData = jwtDecode(resData.data.data);
      pushUserData('userToken', resData.data.data);
      pushUserData('uid', jwtData.user.uid);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resData.data.data);
      dispatch(changeBool({ key: 'isLoggedIn', value: true }));
      history.push({
        pathname: '/newbieguide',
        state: { prevpath: '/profile' },
      });
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임이 중복됩니다!');
    }
  };

  const putData = async () => {
    const resPutData = await putRequest();
    if (resPutData.data.status) {
      const jwtData = jwtDecode(resPutData.data.data);
      pushUserData('userToken', resPutData.data.data);
      pushUserData('uid', jwtData.user.uid);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resPutData.data.data);
      dispatch(
        openSnackBarAction({
          message: '프로필이 수정되었습니다.',
          type: 'success',
        }),
      );
      history.push('/more');
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임이 중복됩니다!');
      dispatch(
        openSnackBarAction({
          message: '닉네임을 변경해주세요.',
          type: 'warning',
        }),
      );
    }
  };

  const requestRegister = () => {
    if (userNicknameOut.trim() && age && gender) {
      postData();
    } else {
      if (!userNicknameOut.trim()) {
        setUserNicknameOut('');
        setNickNameError(true);
        setNickNamePlaceHolder('닉네임은 꼭 넣으세요!');
      }
      if (!age) {
        setAgeError(true);
      }
      if (!gender) {
        setGenderError(true);
      }
    }
  };

  const requestUpdate = () => {
    if (userNicknameOut.trim() && age && gender) {
      putData();
    } else {
      setUserNicknameOut('');
      setNickNameError(true);
      setNickNamePlaceHolder('닉네임은 꼭 넣으세요!');
    }
  };

  const postImage = async () => {
    const reg = /(.*?)\.(jpg|jpeg|png|gif)$/;
    if (!imageFile) {
      setTempImageName('');
      setTempUserImage('');
      setOpenDialog(false);
    } else if (imageFile.name.toLowerCase().match(reg)) {
      const imgData = await postImageRequest();
      setTempImageName(imgData.data.data.imageName);
      setTempUserImage(imgData.data.data.image);
      setOpenDialog(false);
    } else {
      alert('jpg, jpeg, png, gif 확장자만 지원합니다!');
    }
  };

  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    if (prevPath !== '/' && prevPath !== '/more') {
      setIsMe(false);
    }
  }, []);

  let profileButton = '';

  if (prevPath === '/') {
    profileButton = (
      <Button variant="outlined" onClick={requestRegister}>
        가입하기
      </Button>
    );
  } else if (prevPath === '/more') {
    profileButton = (
      <Button variant="outlined" onClick={requestUpdate}>
        수정하기
      </Button>
    );
  }

  const [userDialogImage, setUserDialogImage] = useState(userImage);

  const handleChangeImage = file => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setUserDialogImage(base64);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleChangeDefaultImage = () => {
    setImageFile('');
    setUserDialogImage('');
  };

  return (
    <>
      <div
        style={{
          width: 'inherit',
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!(prevPath === '/') && (
          <BaseAppBar
            style={{ flexGrow: '0' }}
            text={isMe ? '프로필 편집' : `${userNickname}님의 프로필`}
            leftIcon={<ArrowBackIosIcon onClick={handleBackIcon} />}
            rightIcon={
              <SportsEsportsIcon
                onClick={() => {
                  history.push('/PersonalGame');
                }}
              />
            }
          />
        )}
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
            {isMe ? (
              <Badge
                color="primary"
                badgeContent={<AddIcon />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                overlap="circle"
                variant="standard"
              >
                <Avatar
                  alt={userNickname}
                  src={tempUserImage}
                  className={classes.large}
                  onClick={handleProfileImage}
                />
              </Badge>
            ) : (
              <Avatar
                alt={userNickname}
                src={tempUserImage}
                className={classes.large}
              />
            )}
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
                  error={nickNameError}
                  placeholder={nickNamePlaceHolder}
                  id="standard-full-width"
                  label="닉네임"
                  defaultValue={userNicknameOut}
                  value={userNicknameOut}
                  onChange={handleChangeNickname}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    className: classes.multilineColor,
                    readOnly: !isMe,
                  }}
                />
              </Grid>
              <Grid item style={{ marginBottom: '1rem' }}>
                <TextField
                  error={ageError}
                  id="standard-select-currency"
                  select={isMe}
                  fullWidth
                  label="나이대"
                  value={
                    isMe
                      ? age
                      : ageList.find(item => item.value === userAgeRangeFirst)
                          .name
                  }
                  onChange={handleChangeAge}
                  InputProps={{ readOnly: !isMe }}
                >
                  {ageList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item style={{ marginBottom: '1rem' }}>
                <TextField
                  error={genderError}
                  id="standard-select-currency"
                  select={isMe}
                  fullWidth
                  label="성별"
                  value={
                    isMe
                      ? gender
                      : genderList.find(item => item.value === userGenderFirst)
                          .name
                  }
                  onChange={handleChangeGender}
                  InputProps={{ readOnly: !isMe }}
                >
                  {genderList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                {profileButton}
              </Grid>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Grid>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">사진을 올려주세요!</DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt={userNickname}
            src={userDialogImage}
            className={classes.large}
            style={{ marginBottom: '1rem' }}
          />
          <input
            type="file"
            name="file"
            onChange={e => handleChangeImage(e.target.files[0])}
          ></input>
          <Typography style={{ fontSize: 'small' }}>
            5MB 가 넘는 파일은 업로드 속도가 느릴 수 있습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleChangeDefaultImage} color="primary">
            기본 이미지
          </Button>
          <Button onClick={postImage} color="primary">
            사진 수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
