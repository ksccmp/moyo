import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeField, changeBool } from '../modules/auth';
import axios from '../api/axios';
import { Grid, Typography } from '@material-ui/core';
import kakaoBtnSmall from '../assets/img/kakaoLoginBtnSmall.png';
import MOYOLogoMixed from '../assets/img/MOYOLogoMixed.svg';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const jwtDecode = require('jwt-decode');

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const getResponse = async res => {
    try {
      return await axios.post('user/issueToken', {
        provider: 0,
        socialId: res.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async res => {
    const resData = await getResponse(res);
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
        pathname: '/accompany',
      });
    } else {
      history.push({
        pathname: '/profile',
        state: {
          userSocialId: res.id,
          userProfileImage: res.properties.profile_image,
          userNickname: res.properties.nickname,
          userAgeRange: res.kakao_account.age_range,
          userGender: res.kakao_account.gender,
          prevPath: history.location.pathname,
        },
      });
      dispatch(changeBool({ key: 'isLoggedIn', value: true }));
    }
  };

  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  }, []);

  function loginWithKakao() {
    window.Kakao.Auth.loginForm({
      success: function(authObj) {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            getToken(res);
            window.Kakao.Auth.logout();
          },
          fail: function(error) {
            console.log(JSON.stringify(error));
          },
        });
      },
      fail: function(err) {
        console.log(JSON.stringify(err));
      },
    });
    // window.Kakao.cleanup();
  }

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignContent="center"
      style={{ marginTop: '12rem', textAlign: 'center' }}
    >
      <Grid item style={{ marginBottom: '0.7rem' }}>
        <img src={MOYOLogoMixed} width="80%" alt="logo" />
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ letterSpacing: '-0.08rem' }}>
          모여와 함께 하는 모두의 여행
        </Typography>
      </Grid>
      <Grid item onClick={loginWithKakao} style={{ marginTop: '6rem' }}>
        <img src={kakaoBtnSmall} width="60%" alt="Kakao" />
      </Grid>
    </Grid>
  );
};

export default Login;
