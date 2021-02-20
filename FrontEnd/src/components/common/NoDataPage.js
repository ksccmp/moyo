import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import meerkatIcon from '../../assets/icon/icon_meerkat.svg';

const NoDataGrid = styled(Grid)`
  width: 85% !important;
  height: 90%;
  margin: 0 auto !important;
  border-radius: 1rem;
  & > div > img {
    transform: rotateY(180deg);
    filter: opacity(0.5) grayscale(1);
    padding: 1rem;
    width: 40%;
    max-width: 135px;
  }
  & > div > h6 {
    width: 100%;
    text-align: center;
    color: #919394;
  }
`;

const NoDataPage = ({ text }) => {
  return (
    <NoDataGrid container alignItems="center" justify="center">
      <Grid container item justify="center">
        <img alt="no_data_meerkat" src={meerkatIcon} />
        <Typography variant="h6">{text}</Typography>
      </Grid>
    </NoDataGrid>
  );
};

export default NoDataPage;
