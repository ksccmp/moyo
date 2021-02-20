import React from 'react';
import { useHistory } from 'react-router-dom';
import AccompanyListPaper from './AccompanyListPaper';
import styled from 'styled-components';

const ListComponent = styled.div`
  width: 85%;
  min-height: 0;
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: 6rem;
`;

const AccompanyListSet = ({ boardData }) => {
  const history = useHistory();
  const handleBoardClick = board => {
    history.push({
      pathname: '/accompany/accList/' + board.acBoardId,
      state: {
        prevpath: history.location.pathname,
        board: board,
      },
    });
  };
  return (
    <ListComponent>
      {boardData.map(board => (
        <AccompanyListPaper
          key={board.acBoardId}
          boardInfo={board}
          onClick={() => handleBoardClick(board)}
        />
      ))}
    </ListComponent>
  );
};

export default AccompanyListSet;
