import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MoyoIcon from '../../../assets/img/MOYOLogoWhite.svg';
import styled from 'styled-components';

const TitleContainer = styled(Grid)`
  background: linear-gradient(to bottom, #4ac8d9, #4fdbc2);
  background-size: 100% 100%;
`;

const TitleTypo = styled(Typography)`
  padding: 0.7rem 0 1.5rem 1rem;
  color: white;
`;

const HeaderContents = () => {
  return (
    <TitleContainer container direction="column">
      <Grid container item style={{ padding: '2rem 0' }}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <img src={MoyoIcon} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid item>
        <TitleTypo variant="h3">
          함께 여행하는 것은 <br />
          즐거운 일이에요.
        </TitleTypo>
      </Grid>
    </TitleContainer>
  );
};

export default HeaderContents;
