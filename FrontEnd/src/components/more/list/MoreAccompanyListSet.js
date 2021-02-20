import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import MoreAccompanyListPaper from './MoreAccompanyListPaper';
import styled from 'styled-components';

const ListComponent = styled.div`
  width: 85%;
  min-height: 0;
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;
const HrDiv = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const AccompanyListSet = ({ title, boardData, handleClick }) => {
  const TextBar = ({ text }) => (
    <Grid container style={{ marginBottom: '0.5rem' }}>
      <div style={{ flexGrow: '0' }}>
        <Typography style={{ fontSize: '0.9rem' }}>{text}</Typography>
      </div>
      <HrDiv>
        <Divider style={{ width: '90%' }} />
      </HrDiv>
    </Grid>
  );
  return (
    <ListComponent>
      <TextBar text={title} />
      {boardData.map(board => (
        <MoreAccompanyListPaper
          key={board.acBoardId}
          boardInfo={board}
          onClick={() => handleClick(board)}
        />
      ))}
    </ListComponent>
  );
};

export default AccompanyListSet;
