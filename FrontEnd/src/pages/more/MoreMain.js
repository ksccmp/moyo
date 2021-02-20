import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import MoreTitleContents from '../../components/more/main/MoreTitleContents';
import MoreButtonContents from '../../components/more/main/MoreButtonContents';
import CalenderIcon from '../../../src/assets/icon/icon_calender.svg';
import AccompanyIcon from '../../../src/assets/icon/icon_accompany.svg';
import CommunityIcon from '../../../src/assets/icon/icon_community.svg';
import styled from 'styled-components';
// import { changeField } from '../../modules/auth';
// import axios from '../../api/axios';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
`;

const MoreMain = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const jwtDecode = require('jwt-decode');
  // const userData = useSelector(state => state.auth.userData);

  const handlePlanClick = () => {
    history.push({
      pathname: '/more/morePlan',
      state: { prevpath: '/more' },
    });
  };
  const handleAccompanyManageClick = () => {
    history.push('/more/accompanyManage');
  };

  const handleCommunityClick = () => {
    history.push('/more/moreCommunity');
  };

  return (
    <>
      <Grid container direction="column">
        <MoreTitleContents />
        <InnerGrid item>
          <MoreButtonContents
            icon={CalenderIcon}
            onClick={handlePlanClick}
            menuName="여행 일정 관리"
          />
        </InnerGrid>
        <InnerGrid item>
          <MoreButtonContents
            icon={AccompanyIcon}
            onClick={handleAccompanyManageClick}
            menuName="내 동행 글"
          />
        </InnerGrid>
        <InnerGrid item>
          <MoreButtonContents
            icon={CommunityIcon}
            onClick={handleCommunityClick}
            menuName="내 커뮤니티 글"
          />
        </InnerGrid>
      </Grid>
    </>
  );
};

export default MoreMain;
