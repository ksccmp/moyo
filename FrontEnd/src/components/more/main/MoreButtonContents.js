import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

const ContainerGrid = styled(Grid)`
  background-color: white;
  width: 100% !important;
  border-radius: 1rem;
  margin: 1rem auto 0;
`;

const ButtonContainer = styled.div`
  width: 30%;
  margin: 0.7rem 0 0.35rem 2rem;
`;

const ButtonTypo = styled(Typography)`
  margin: 1.8rem 1.7rem 0.3rem 0 !important;
  text-align: right;
  font-weight: 700 !important;
`;

const MoreButtonContents = ({ icon, onClick, menuName }) => {
  return (
    <ContainerGrid
      container
      direction="row"
      justify="space-between"
      onClick={onClick}
    >
      <Grid item xs={6}>
        <ButtonContainer>
          <img alt="more_icon" src={icon} />
        </ButtonContainer>
      </Grid>
      <Grid item>
        <ButtonTypo variant="h6" style={{ letterSpacing: '-0.08rem' }}>
          {menuName}
        </ButtonTypo>
      </Grid>
    </ContainerGrid>
  );
};

export default MoreButtonContents;
