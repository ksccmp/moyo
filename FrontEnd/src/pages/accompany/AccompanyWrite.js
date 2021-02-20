import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  TextField,
  Grid,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseAppBar from '../../components/common/BaseAppBar';
import MainForm from '../../components/accompany/write/MainForm';
import SubForm from '../../components/accompany/write/SubForm';
import { openSnackBarAction } from '../../modules/snackBar';
import moment from 'moment';
import axios from '../../api/axios';
import {
  getNationList,
  getCityList,
  getGenderList,
  getAgeList,
  getTypeList,
} from '../../api/commonData';
import styled from 'styled-components';

const InnerGrid = styled(Grid)`
  width: 85%;
  background-color: white;
  border-radius: 1rem;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const CustomInputField = styled(TextField)`
  & > div::before {
    border-bottom: 0;
  }
`;

const CustomExpansionPanel = styled(ExpansionPanel)`
  margin: 0 !important;
  & > div {
    margin: 0;
    padding-left: 1rem;
    & > div {
      margin: 0 !important;
    }
    & > div > div > div > div {
      padding: 0 !important;
    }
  }
`;

const AccompanyWrite = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData, []);
  const isModify = history.location.pathname.indexOf('more') > -1;
  const modifyBoard = history.location.state.board;

  const [cityList, setCityList] = useState([]);
  const [nationList, setNationList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [ageList, setAgeList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [nation, setNation] = useState('');
  const [city, setCity] = useState('');
  const [content, setContent] = useState('');

  const [gender, setGender] = useState('N');
  const [age, setAge] = useState('0');
  const [type, setType] = useState('0');
  const [expanded, setExpanded] = React.useState('');

  useEffect(() => {
    const fetchNationList = async () => {
      setNationList(await getNationList());
      setGenderList(await getGenderList(true));
      setAgeList(await getAgeList(true));
      setTypeList(await getTypeList(true));
      if (isModify && modifyBoard) {
        setCityList(await getCityList(modifyBoard.nid));
      }
    };
    fetchNationList();
    if (isModify) {
      setTitle(modifyBoard.title);
      setStartDate(modifyBoard.startDate);
      setEndDate(modifyBoard.endDate);
      setNation(modifyBoard.nid);
      setCity(modifyBoard.cid);
      setContent(modifyBoard.contents);
      setGender(modifyBoard.wantGender.toUpperCase());
      setAge(modifyBoard.wantAge);
      setType(String(modifyBoard.ttypeId));
    }
  }, []);

  const postAccompanyBoard = async boardData => {
    try {
      return await axios.post(`accompanyBoard/create`, boardData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const putAccompanyBoard = async boardData => {
    try {
      return await axios.put(`accompanyBoard/update`, boardData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validateInput = () => {
    const openSnackbar = (text, textOption = '입력') => {
      dispatch(
        openSnackBarAction({
          message: `${text}를 ${textOption}해주세요.`,
          type: 'warning',
        }),
      );
    };

    if (title.trim() === '') {
      openSnackbar('제목');
      return false;
    }
    if (endDate === null) {
      openSnackbar('날짜', '선택');
      return false;
    }
    if (nation === '' || city === '') {
      openSnackbar('나라 및 도시', '선택');
      return false;
    }
    if (content.trim() === '') {
      openSnackbar('내용');
      return false;
    }

    return true;
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleSubmitClick = () => {
    if (!validateInput()) {
      return;
    }
    const boardData = isModify
      ? {
          ...modifyBoard,
          nid: nation,
          cid: city,
          contents: content,
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
          title: title,
          ttypeId: type,
          type: typeList.find(item => item.ttypeId === type).name,
          uid: userData.uid,
          wantAge: age.toLowerCase(),
          wantGender: gender,
        }
      : {
          nid: nation,
          cid: city,
          contents: content,
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
          title: title,
          ttypeId: type,
          uid: userData.uid,
          wantAge: age.toLowerCase(),
          wantGender: gender,
        };

    const fetchBoard = async () => {
      isModify
        ? await putAccompanyBoard(boardData)
        : await postAccompanyBoard(boardData);
    };

    fetchBoard();

    dispatch(
      openSnackBarAction({
        message: isModify
          ? `동행 글이 수정되었습니다.`
          : `동행 글이 등록되었습니다.`,
        type: 'success',
      }),
    );
    history.push({
      pathname: history.location.state.nowpath,
      state: {
        prevpath: history.location.state.prevpath,
        board: boardData,
      },
    });
  };

  // main form event
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleStartDate = date => {
    setStartDate(date);
  };
  const handleEndDate = date => {
    setEndDate(date);
  };
  const handleNationChange = async e => {
    setNation(e.target.value);
    const res = await getCityList(e.target.value);
    setCityList(res);
  };
  const handleCityChange = e => {
    setCity(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  const handleAgeChecked = value => age.indexOf(String(value)) > -1;

  const handleAgeChange = e => {
    const value = String(e.target.value);
    if (value === '0') {
      setAge('0');
    } else {
      if (age === '0') {
        setAge(value);
      } else {
        let ageArr = age.split('|');
        ageArr.indexOf(value) > -1
          ? setAge(ageArr.filter(item => item !== value).join('|'))
          : setAge(age + '|' + value);
      }
    }
  };

  const handleTypeChange = e => {
    setType(e.target.value);
  };

  const handleExpandChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <BaseAppBar
        text="글 작성하기"
        leftIcon={<ArrowBackIosIcon />}
        rightText="완료"
        leftClick={handleBackClick}
        rightClick={handleSubmitClick}
      />
      <InnerGrid>
        <div>
          <Grid container direction="column">
            <MainForm
              title={title}
              startDate={startDate}
              endDate={endDate}
              nationList={nationList}
              cityList={cityList}
              nation={nation}
              city={city}
              onTitleChange={handleTitleChange}
              onStartDateChange={handleStartDate}
              onEndDateChange={handleEndDate}
              onNationChange={handleNationChange}
              onCityChange={handleCityChange}
            />
            <Divider />
            <CustomExpansionPanel
              square
              expanded={expanded === 'panel1'}
              onChange={handleExpandChange('panel1')}
              elevation={0}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Grid item xs={4}>
                  <Typography
                    style={{ letterSpacing: '-0.05rem', fontWeight: '700' }}
                  >
                    상세설정
                  </Typography>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SubForm
                  genderList={genderList}
                  typeList={typeList}
                  ageList={ageList}
                  gender={gender}
                  type={type}
                  age={age}
                  onGenderChange={handleGenderChange}
                  onAgeChecked={handleAgeChecked}
                  onAgeChange={handleAgeChange}
                  onTypeChange={handleTypeChange}
                />
              </ExpansionPanelDetails>
            </CustomExpansionPanel>

            <Divider />
            <Grid item>
              <CustomInputField
                id="outlined-multiline-static"
                placeholder="내용을 입력해주세요"
                multiline
                fullWidth
                rows="10"
                value={content}
                onChange={handleContentChange}
                style={{ padding: '1rem' }}
              />
            </Grid>
          </Grid>
        </div>
      </InnerGrid>
    </>
  );
};

export default AccompanyWrite;
