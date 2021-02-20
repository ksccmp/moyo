import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '../../../assets/icon/icon_settings.svg';
import styled from 'styled-components';

const TitleContainer = styled(Grid)`
  background: linear-gradient(to bottom, #4ac8d9, #4fdbc2);
  background-size: 100% 100%;
`;

const ButtonSettingsContainer = styled.div`
  width: 1.55rem;
  position: absolute;
  right: 4%;
  top: 2%;
  z-index: 1;
`;

const useStyles = makeStyles(theme => ({
  rootAvatar: {},
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '0.25rem',
  },
}));

const TitleTypo = styled(Typography)`
  padding: 0.7rem 0 1.5rem 1rem;
  color: white;
`;

const HeaderContents = () => {
  const history = useHistory();
  const classes = useStyles();
  const userData = useSelector(state => state.auth.userData);
  const handleSettingsClick = () => {
    history.push('/more/moreSettings');
  };

  const handleProfileEditClick = () => {
    history.push({
      pathname: '/profile',
      state: {
        userSocialId: '',
        userProfileImage: userData.image,
        userNickname: userData.nickname,
        userAgeRange: userData.age,
        userGender: userData.gender,
        prevPath: history.location.pathname,
      },
    });
  };

  return (
    <>
      <TitleContainer container direction="column">
        <ButtonSettingsContainer onClick={handleSettingsClick}>
          <img alt="icon_setting" src={SettingsIcon} />
        </ButtonSettingsContainer>
        <Grid item style={{ flexGrow: '1' }}></Grid>
        <Grid item container style={{ flexGrow: '1', marginTop: '6.7rem' }}>
          <Grid item xs={4}>
            <Avatar
              alt={userData.nickname}
              src={userData.image}
              className={classes.large}
              style={{ margin: '0 0 1.4rem 1.4rem' }}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
            xs={8}
            spacing={2}
            style={{ paddingBottom: '1rem' }}
          >
            <Grid item style={{ paddingTop: '0rem' }}>
              <TitleTypo
                variant="h5"
                style={{ padding: '0rem', letterSpacing: '-0.05rem' }}
              >
                안녕하세요 {userData.nickname}님!
              </TitleTypo>
            </Grid>
            <Grid item style={{ paddingTop: '0.3rem' }}>
              <Button
                variant="contained"
                disableElevation={true}
                style={{
                  backgroundColor: 'white',
                  padding: '0.2rem 0.7rem',
                  letterSpacing: '-0.03rem',
                  fontWeight: '700',
                }}
                onClick={handleProfileEditClick}
              >
                프로필 수정
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </TitleContainer>
    </>
  );
};

export default HeaderContents;
