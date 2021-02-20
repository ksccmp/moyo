import React, { useState, useEffect, useCallback } from 'react';
import {
  changeCmId,
  changeTitle,
  changeContents,
  changeType,
} from '../../modules/community';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import CommunityListSet from '../../components/community/CommunityListSet';
import AccompanySearchBar from '../../components/accompany/List/AccompanySearchBar';
import { Tabs, Tab, Fab, Grid } from '@material-ui/core/';
import moyoColor from '../../api/moyoColor';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import { openModalAction, closeModalAction } from '../../modules/progressModal';

const HeaderTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: white;
  }
  & span {
    color: white;
  }
`;

const FloatingFab = styled(Fab)`
  position: fixed !important;
  right: 6%;
  bottom: 12%;
`;

const CommunityContainer = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  flex: 1;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  min-height: 0;
`;

const CommunityList = props => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [communityData, setCommunityData] = useState([]);
  const [communityTypeList, setCommunityTypeList] = useState([]);
  const [communityType, setCommunityType] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  const onChangeCmId = useCallback(cmId => dispatch(changeCmId(cmId)), [
    dispatch,
  ]);
  const onChangeTitle = useCallback(title => dispatch(changeTitle(title)), [
    dispatch,
  ]);
  const onChangeContents = useCallback(
    contents => dispatch(changeContents(contents)),
    [dispatch],
  );
  const onChangeType = useCallback(cmTypeId => dispatch(changeType(cmTypeId)), [
    dispatch,
  ]);

  const getCommunityList = async () => {
    try {
      return await axios.get(`community/selectAll`, {
        headers: { userToken: userData.userToken },
        params: { cmTypeId: communityType, searchWord: searchWord },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCommunityTypeList = async () => {
    try {
      return await axios.get('community/selectCommunityType', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCommunityTypeList = async () => {
      const result = await getCommunityTypeList();
      result.data.data.unshift({ cmTypeId: 0, name: '전체' });
      setCommunityTypeList(result.data.data);
    };
    fetchCommunityTypeList();
  }, []);

  useEffect(() => {
    dispatch(openModalAction());
    const getCommunity = async () => {
      const result = await getCommunityList();
      const resData = result.data.data.map(item => {
        return {
          ...item,
        };
      });
      setCommunityData(resData);
      dispatch(closeModalAction());
    };
    getCommunity();
  }, [communityType, searchWord]);

  const handleTabChange = async cmTypeId => {
    setCommunityType(cmTypeId);
  };

  const handleSearchClick = text => {
    setSearchWord(text);
  };

  const handleCommunityWriteClick = () => {
    onChangeCmId(null);
    onChangeTitle('');
    onChangeContents('');
    onChangeType('');
    history.push({
      pathname: '/community/write',
      state: {
        prevpath: history.location.pathname,
        communityPutCheck: false,
        communityTypeList: communityTypeList,
      },
    });
  };

  return (
    <>
      <Grid container direction="column" style={{ height: '100%' }}>
        <Grid item style={{ width: '100%' }}>
          <HeaderTabs
            value={communityType}
            variant="scrollable"
            scrollButtons="auto"
            style={{ backgroundColor: moyoColor.moyo_green_1 }}
          >
            {communityTypeList.map(type => (
              <Tab
                key={type.cmTypeId}
                label={type.name}
                onClick={() => handleTabChange(type.cmTypeId)}
              />
            ))}
          </HeaderTabs>
        </Grid>
        <Grid item style={{ marginTop: '0.7rem', marginBottom: '0.7rem' }}>
          <AccompanySearchBar onClick={handleSearchClick} />
        </Grid>
        <CommunityContainer item>
          <CommunityListSet
            communityData={communityData}
            pathname={props.location.pathname}
          />
        </CommunityContainer>
      </Grid>
      <FloatingFab
        variant="extended"
        color="secondary"
        aria-label="filter"
        onClick={handleCommunityWriteClick}
      >
        <CreateIcon />
      </FloatingFab>
    </>
  );
};

export default CommunityList;
