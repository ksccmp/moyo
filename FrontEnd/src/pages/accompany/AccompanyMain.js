import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import moment from 'moment';
import { openModalAction, closeModalAction } from '../../modules/progressModal';
import ButtonContents from '../../components/accompany/main/ButtonContents';
import ScheduleContents from '../../components/accompany/main/ScheduleContents';
import AdvertisingContents from '../../components/accompany/main/AdvertisingContents';
import TitleContents from '../../components/accompany/main/TitleContents';

import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const AccompanyMain = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [tripSchedule, setTripSchedule] = useState([]);
  const [tripCompanion, setTripCompanion] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const getTripSchedule = async () => {
    try {
      const momentDate = moment(new Date()).format('YYYY-MM-DD');
      return await axios.get(
        `scheduleList/selectAllByUser/${userData.uid}/${momentDate}`,
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTripCompanion = async () => {
    try {
      const momentDate = moment(new Date()).format('YYYY-MM-DD');
      return await axios.get(
        `dailyAccompany/selectAllByUser/${userData.uid}/${momentDate}`,
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getPromotions = async () => {
    try {
      return await axios.get('/accompanyBoard/getPromotionImages', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(openModalAction());
    const fetchTripInfo = async () => {
      const sRes = await getTripSchedule();
      const cRes = await getTripCompanion();
      const aRes = await getPromotions();
      if (sRes && sRes.data && sRes.data.data) {
        setTripSchedule(sRes.data.data);
      }
      if (cRes && cRes.data && cRes.data.data) {
        setTripCompanion(cRes.data.data);
      }
      if (aRes && aRes.data && aRes.data.data) {
        setPromotions(aRes.data.data);
      }
      dispatch(closeModalAction());
    };
    fetchTripInfo();
  }, []);

  const handleAccompanyFindClick = () => {
    history.push({
      pathname: '/accompany/accSetLoc',
      state: { prevpath: history.location.pathname },
    });
  };

  const handleAccompanyWriteClick = () => {
    history.push({
      pathname: '/accompany/write',
      state: {
        prevpath: history.location.pathname,
        nowpath: history.location.pathname,
      },
    });
  };

  return (
    <Grid container direction="column">
      <TitleContents />
      <InnerGrid item>
        <ButtonContents
          onFindClick={handleAccompanyFindClick}
          onWriteClick={handleAccompanyWriteClick}
        />
      </InnerGrid>
      <InnerGrid item>
        <ScheduleContents
          tripSchedule={tripSchedule}
          tripCompanion={tripCompanion}
        />
      </InnerGrid>
      <InnerGrid item>
        <AdvertisingContents promotions={promotions} />
      </InnerGrid>
    </Grid>
  );
};

export default AccompanyMain;
