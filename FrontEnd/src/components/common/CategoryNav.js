import React, { useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChatIcon from '@material-ui/icons/Chat';
import RoomIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import { navigationSelect } from '../../modules/baseNavigation';
import styled from 'styled-components';

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  min-width: 0 !important;
  & .MuiBottomNavigationAction-label {
    font-size: 0.45rem;
  }
  & .Mui-selected {
    font-size: 0.62rem !important;
  }
`;
const CategoryNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const select = useSelector(state => state.baseNavigation.select);
  const refAccompany = useState(() => createRef());
  const refDM = useState(() => createRef());

  const handleNavChange = (event, newValue) => {
    dispatch(navigationSelect(newValue));
  };

  const handleMoreClick = () => {
    history.push('/more');
  };
  const handlePostMapClick = () => {
    history.push('/postmap');
  };
  const handleDMClick = () => {
    history.push('/dmroomlist');
  };
  const handleAccompanyClick = () => {
    history.push('/accompany');
  };
  const handleCommunityClick = () => {
    history.push('/community');
  };

  return (
    <BottomNavigation
      value={select}
      onChange={handleNavChange}
      style={{zIndex:"9999"}}
    >
      <StyledBottomNavigationAction
        ref={refAccompany}
        label="동행"
        value="accompany"
        icon={<CardTravelIcon />}
        onClick={handleAccompanyClick}
      />
      <StyledBottomNavigationAction
        label="포스트맵"
        value="postmap"
        icon={<RoomIcon />}
        onClick={handlePostMapClick}
      />
      <StyledBottomNavigationAction
        ref={refDM}
        label="채팅"
        value="DM"
        icon={<ChatIcon />}
        onClick={handleDMClick}
      />
      <StyledBottomNavigationAction
        label="커뮤니티"
        value="community"
        icon={<ForumIcon />}
        onClick={handleCommunityClick}
      />
      <StyledBottomNavigationAction
        label="더보기"
        value="more"
        icon={<MoreHorizIcon />}
        onClick={handleMoreClick}
      />
    </BottomNavigation>
  );
};

export default CategoryNav;
