import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import moment from '../../api/moment';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BaseAppBar from '../../components/common/BaseAppBar';
import MoreAccompanyListSet from '../../components/more/list/MoreAccompanyListSet';

const MoreAccompanyManage = () => {
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);
  const [curList, setCurList] = useState([]);
  const [prevList, setPrevList] = useState([]);

  const getAccompanyList = async () => {
    try {
      return axios.get(`accompanyBoard/selectAllByUser/${userData.uid}`, {
        headers: { userToken: localStorage.token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAccompanyList = async () => {
      const res = await getAccompanyList();
      if (res && res.data && res.data.data) {
        const resData = res.data.data;
        let cur = [];
        let prev = [];
        for (let item of resData) {
          if (
            item.deadlineToggle === 'n' &&
            moment.convertDate() <= moment.convertDate(item.endDate)
          ) {
            item.validDate = true;
            cur.push(item);
          } else {
            item.validDate =
              moment.convertDate() <= moment.convertDate(item.endDate);
            prev.push(item);
          }
        }
        setCurList(cur);
        setPrevList(prev);
      }
    };
    fetchAccompanyList();
  }, []);

  const handleModifyDetail = item => {
    history.push({
      pathname: '/more/accompanyDetail/' + item.acBoardId,
      state: {
        prevpath: history.location.pathname,
        board: item,
      },
    });
  };

  const handleBackClick = () => {
    history.push({
      pathname: '/more',
    });
  };

  return (
    <>
      <BaseAppBar
        text="내 동행 글"
        leftIcon={<ArrowBackIosIcon />}
        leftClick={handleBackClick}
      />
      <Grid container style={{ marginTop: '0.8rem' }}>
        <MoreAccompanyListSet
          title="진행 중인 동행 글"
          boardData={curList}
          handleClick={handleModifyDetail}
        />
        <MoreAccompanyListSet
          title="종료된 동행 글"
          boardData={prevList}
          handleClick={handleModifyDetail}
        />
      </Grid>
    </>
  );
};

export default MoreAccompanyManage;
