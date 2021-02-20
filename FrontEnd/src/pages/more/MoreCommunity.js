import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import BaseAppBar from '../../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CommunityListSet from '../../components/community/CommunityListSet';
import styled from 'styled-components';

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1rem;
`;

const MoreCommunity = props => {
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);
  const [myCommunityData, setMyCommunityData] = useState([]);

  const getCommunity = async () => {
    try {
      return await axios.get(`community/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      const cmtData = await getCommunity();
      setMyCommunityData(cmtData.data.data);
    }
    getData();
  }, []);

  const handleBackIcon = () => {
    history.push('/more');
  };

  return (
    <>
      <BaseAppBar
        text="내 커뮤니티 글"
        leftIcon={<ArrowBackIosIcon onClick={handleBackIcon} />}
      />
      <Container>
        <CommunityListSet
          communityData={myCommunityData}
          pathname={props.location.pathname}
        />
      </Container>
    </>
  );
};

export default MoreCommunity;
