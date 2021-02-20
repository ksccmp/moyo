import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import accompanyFindImg from '../../../assets/icon/icon_suitcase.svg';
import accompanyWriteImg from '../../../assets/icon/icon_passport.svg';

const ContainerGrid = styled(Grid)`
  background-color: white;
  width: 100% !important;
  border-radius: 1rem;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  width: 35%;
  margin: 0 auto;
  margin-top: 1.4rem;
`;
const ButtonTypo = styled(Typography)`
  margin: 0.5rem 0 1.5rem 0 !important;
  font-weight: 800 !important;
`;

const ButtonContents = ({ onFindClick, onWriteClick }) => {
  return (
    <ContainerGrid container>
      <Grid item xs={6} onClick={onFindClick}>
        <ButtonContainer>
          <img alt="find_Img" src={accompanyFindImg} />
        </ButtonContainer>
        <ButtonTypo variant="h5" align="center">
          동행 찾기
        </ButtonTypo>
      </Grid>
      <Grid item xs={6} onClick={onWriteClick}>
        <ButtonContainer>
          <img alt="write_img" src={accompanyWriteImg} />
        </ButtonContainer>
        <ButtonTypo variant="h5" align="center">
          동행 구하기
        </ButtonTypo>
      </Grid>
    </ContainerGrid>
  );
};

export default ButtonContents;
