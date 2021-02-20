import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import qs from 'qs';
import axios from '../../api/axios';
import moyoColor from '../../api/moyoColor';

import { Grid, IconButton, Fab, Typography } from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoyoIcon from '../../assets/icon/icon_moyo_white.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import {
  accompanyFilterGender,
  accompanyFilterAge,
  accompanyFilterType,
} from '../../modules/accompanyFilter';
import { accompanyDate } from '../../modules/accompanyCondition';

import AccompanySearchBar from '../../components/accompany/List/AccompanySearchBar';
import AccompanyListSet from '../../components/accompany/List/AccompanyListSet';
import AccompanyFilterDialog from '../../components/accompany/List/AccompanyFilterDialog';
import NoDataPage from '../../components/common/NoDataPage';
import { openModalAction, closeModalAction } from '../../modules/progressModal';

const MainGrid = styled(Grid)`
  height: inherit;
`;
const HeaderGrid = styled(Grid)`
  background-color: ${moyoColor.moyo_green_1};
  flex: 0 1 auto;
`;
const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollGrid = styled(Grid)`
  flex: 1;
  position: relative;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderTypo = styled(Typography)`
  color: white;
  display: inline-block;
`;

const StyledDiv = styled.div`
  display: flex;
  align-content: center;
  text-align: center;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;

const FloatingFab = styled(Fab)`
  position: fixed !important;
  right: 8%;
  bottom: 12%;
`;

const UnderlineTypo = styled(Typography)`
  text-decoration-line: underline;
  text-underline-position: under;
`;

const AccompanyList = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData, []);
  const [searchText, setSearchText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { accNation, accCity, accDate } = useSelector(
    state => ({
      accNation: state.accompanyCondition.nation,
      accCity: state.accompanyCondition.city,
      accDate: state.accompanyCondition.date,
    }),
    [],
  );
  const { filterGender, filterAge, filterType } = useSelector(state => ({
    filterGender: state.accompanyFilter.gender,
    filterAge: state.accompanyFilter.age,
    filterType: state.accompanyFilter.type,
  }));
  const [boardData, setBoardData] = useState([]);

  const convertFilterType = types => {
    const arr = ['식사', '관광', '카페', '투어'];
    const converted = Object.keys(types)
      .filter(item => types[item])
      .map(item => arr.indexOf(item) + 1);
    return converted.length === 0 ? [0] : converted;
  };

  const convertAgeType = ages => {
    const converted = Object.keys(ages)
      .filter(item => ages[item])
      .map(item => Number(item) / 10);
    return converted.length === 0 ? [0] : converted;
  };

  const convertDate = date => moment(date).format('YYYY-MM-DD');

  const filterCondition = useCallback(
    {
      searchDate: convertDate(accDate),
      cId: accCity.code,
      nId: accNation.code,
      searchAge: convertAgeType(filterAge),
      searchGender: filterGender || 'N',
      searchType: convertFilterType(filterType),
      searchCondition: '',
      searchWord: searchText,
      searchSort: '',
    },
    [filterGender, filterAge, filterType, searchText, accDate],
  );

  const getAccompanyBoardList = async () => {
    try {
      return await axios.get('accompanyBoard/selectAll', {
        params: filterCondition,
        paramsSerializer: params => qs.stringify(params),
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(openModalAction());
    const getBoards = async () => {
      const result = await getAccompanyBoardList();
      const resData = result.data.data.map(board => ({
        ...board,
        validDate: true,
      }));
      setBoardData(resData);
      dispatch(closeModalAction());
    };
    getBoards();
  }, [filterCondition]);

  // ----------------------event-----------------------
  const handleSearchClick = text => {
    setSearchText(text);
  };
  const handleFilterGenderChange = e =>
    dispatch(accompanyFilterGender(e.target.value));
  const handleFilterAgeChange = name => e =>
    dispatch(
      accompanyFilterAge({ ...filterAge, [name.age]: e.target.checked }),
    );
  const handleFilterTypeChange = name => e =>
    dispatch(
      accompanyFilterType({ ...filterType, [name.type]: e.target.checked }),
    );
  const handleFilteringClick = () => {
    setDialogOpen(true);
  };
  const handleSubmit = () => {
    setDialogOpen(false);
  };

  const handleLocationSelect = () => {
    history.push({
      pathname: '/accompany/accSetLoc',
      state: { prevpath: history.location.pathnmae },
    });
  };
  const handleDateSelect = () => {
    history.push({
      pathname: '/accompany/accSetDate',
      state: { prevpath: history.location.pathnmae },
    });
  };
  const handleHomeClick = () => {
    history.push({
      pathname: '/accompany',
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
  const handlePreDayClick = () => {
    let preDate = new Date(accDate);
    const nowDate = new Date();
    preDate.setDate(preDate.getDate() - 1);
    if (
      moment(nowDate).format('YYYY-MM-DD') <=
      moment(preDate).format('YYYY-MM-DD')
    ) {
      dispatch(accompanyDate(preDate));
    }
  };
  const handleNextDayClick = () => {
    let nextDate = new Date(accDate);
    nextDate.setDate(nextDate.getDate() + 1);
    dispatch(accompanyDate(nextDate));
  };

  return (
    <>
      <MainGrid container direction="column">
        <HeaderGrid item container>
          <CenterGrid item xs={2}>
            <IconButton color="inherit" onClick={handleHomeClick}>
              <img
                alt="icon_moyo_white"
                src={MoyoIcon}
                style={{ height: '2rem' }}
              />
            </IconButton>
          </CenterGrid>
          <CenterGrid item xs={8} style={{ position: 'relative' }}>
            <StyledDiv onClick={handleLocationSelect}>
              <HeaderTypo variant="h5" align="center">
                {accNation.name} / {accCity.name}
              </HeaderTypo>
              <ArrowDropDownIcon style={{ color: 'white' }} />
            </StyledDiv>
          </CenterGrid>
          <CenterGrid item xs={2}>
            <IconButton color="inherit" onClick={handleAccompanyWriteClick}>
              <BorderColorIcon style={{ color: 'white' }} />
            </IconButton>
          </CenterGrid>
        </HeaderGrid>
        <CenterGrid item>
          <IconButton color="inherit" onClick={handlePreDayClick}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <StyledDiv onClick={handleDateSelect}>
            <UnderlineTypo variant="subtitle1" align="center">
              {convertDate(accDate)}
            </UnderlineTypo>
          </StyledDiv>
          <IconButton color="inherit" onClick={handleNextDayClick}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </CenterGrid>
        <Grid item style={{ flex: '0 1 auto', marginBottom: '1rem' }}>
          <AccompanySearchBar onClick={handleSearchClick} />
        </Grid>

        <ScrollGrid item>
          {boardData.length === 0 ? (
            <NoDataPage text={'등록된 동행글이 없어요!'} />
          ) : (
            <AccompanyListSet boardData={boardData} />
          )}
        </ScrollGrid>
      </MainGrid>

      <FloatingFab
        variant="extended"
        color="secondary"
        aria-label="filter"
        onClick={handleFilteringClick}
      >
        <FilterListIcon />
        필터
      </FloatingFab>

      <AccompanyFilterDialog
        filterGender={filterGender}
        filterAge={filterAge}
        filterType={filterType}
        onGenderChange={handleFilterGenderChange}
        onAgeChange={handleFilterAgeChange}
        onTypeChange={handleFilterTypeChange}
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
        }}
        handleSubmit={() => handleSubmit()}
      />
    </>
  );
};

export default AccompanyList;
