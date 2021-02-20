import React, { useEffect } from 'react';
import styled from 'styled-components';

import AccompanyMain from './pages/accompany/AccompanyMain';
import AccompanyLocationSelect from './pages/accompany/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/accompany/AccompanyDateSelect';
import AccompanyList from './pages/accompany/AccompanyList';
import AccompanyDetail from './pages/accompany/AccompanyDetail';
import AccompanyWrite from './pages/accompany/AccompanyWrite';
import MoreMain from './pages/more/MoreMain';
import MorePlan from './pages/more/MorePlan';
import MoreCommunity from './pages/more/MoreCommunity';
import MoreSettings from './pages/more/MoreSettings';
import MoreAccompanyManage from './pages/more/MoreAccompanyManage';
import CategoryNav from './components/common/CategoryNav';
import { Route, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewbieGuide from './pages/NewbieGuide';
import Container from '@material-ui/core/Container';
import DmRoom from './pages/dm/DmRoom';
import DmRoomList from './pages/dm/DmRoomList';
import PostMap from './pages/postmap/Postmap';
import CommunityList from './pages/community/CommunityList';
import CommunityDetail from './pages/community/CommunityDetail';
import CommunityWrite from './pages/community/CommunityWrite';
import PersonalGame from './pages/game/PersonalGame';
import ProgressModal from './components/common/ProgressModal';
import SnackBar from './components/common/SnackBar';

import { changeBool } from './modules/auth';

const StyledContainer = styled(Container)`
  padding: 0 !important;
  position: relative;
  height: inherit;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(changeBool({ key: 'isLoggedIn', value: false }));
    }
  }, [localStorage.token]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <StyledDiv>
      <StyledContainer>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/accompany" /> : <Login />}
        </Route>
        {isLoggedIn && (
          <>
            <Route path="/profile" component={Profile} />
            <Route path="/newbieguide" component={NewbieGuide} />
            <Route exact path="/accompany" component={AccompanyMain} />
            <Route
              path="/accompany/accSetLoc"
              component={AccompanyLocationSelect}
            />
            <Route
              path="/accompany/accSetDate"
              component={AccompanyDateSelect}
            />
            <Route exact path="/accompany/accList" component={AccompanyList} />
            <Route
              path={['/accompany/accList/:id', '/more/accompanyDetail/:id']}
              component={AccompanyDetail}
            />
            <Route
              path={['/accompany/write', '/more/accompanyWrite']}
              component={AccompanyWrite}
            />
            <Route exact path="/more" component={MoreMain} />
            <Route path="/more/morePlan" component={MorePlan} />
            <Route path="/more/moreSettings" component={MoreSettings} />
            <Route
              path="/more/accompanyManage"
              component={MoreAccompanyManage}
            />
            <Route path="/more/moreCommunity" component={MoreCommunity} />
            <Route path="/dmroom/:receiverId" component={DmRoom} />
            <Route path="/dmroomlist" component={DmRoomList} />
            <Route path="/postmap" component={PostMap} />
            <Route exact path="/community" component={CommunityList} />
            <Route path="/community/write" component={CommunityWrite} />
            <Route
              path="/community/communityList/:id"
              component={CommunityDetail}
            />
            <Route path="/personalgame" component={PersonalGame} />
          </>
        )}
        <ProgressModal />
        <SnackBar />
      </StyledContainer>
      {!(
        location.pathname === '/' ||
        location.pathname === '/profile' ||
        location.pathname === '/newbieguide'
      ) && <CategoryNav />}
    </StyledDiv>
  );
};

export default App;
