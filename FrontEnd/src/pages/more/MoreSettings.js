import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeBool } from '../../modules/auth';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BaseAppBar from '../../components/common/BaseAppBar';
import { Typography, Grid } from '@material-ui/core';
import { navigationSelect } from '../../modules/baseNavigation';

const MoreSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // window.Kakao.Auth.logout();
    localStorage.removeItem('token');
    dispatch(changeBool({ key: 'isLoggedIn', value: false }));
    dispatch(navigationSelect('accompany'));
    window.Kakao.cleanup();
  };

  const handleBackIcon = () => {
    history.push('/more');
  };

  const handleGuide = () => {
    history.push({
      pathname: '/newbieguide',
      state: { prevpath: '/more/moreSettings' },
    });
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
        <BaseAppBar
          text="설정"
          leftIcon={<ArrowBackIosIcon onClick={handleBackIcon} />}
        />
        <Grid
          item
          direction="column"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 'inherit',
          }}
        >
          <Typography
            variant="h6"
            onClick={handleGuide}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            가이드 보기
          </Typography>
          <Typography
            variant="h6"
            onClick={handleLogOut}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            로그아웃
          </Typography>
        </Grid>
      </div>
    </>
  );
};

export default MoreSettings;
