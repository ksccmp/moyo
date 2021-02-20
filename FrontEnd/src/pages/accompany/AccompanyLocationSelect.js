import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Divider,
  IconButton,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getNationList, getCityList } from '../../api/commonData';
import {
  accompanyNation,
  accompanyCity,
} from '../../modules/accompanyCondition';

const HeaderContainer = styled(Grid)`
  position: static;
  background: linear-gradient(to bottom, #4ac8d9, #4fdbc2);
  background-size: 100% 100%;
  color: white;
  padding: 1.5rem 0 2.5rem 0;
`;
const StyledDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
`;
const ListContainer = styled.div`
  background-color: white;
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
`;
const ScrollGrid = styled(Grid)`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AccompanyLocationSelect = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [nationList, setNationList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedNation, setSelectedNation] = useState(0);

  useEffect(() => {
    const fetchNationList = async () => {
      const resData = await getNationList();
      setNationList(resData);
      handleNationClick(resData[0], 0);
    };
    fetchNationList();
  }, []);

  const handleNationClick = async (nationItem, idx) => {
    setSelectedNation(idx);
    getCityList(nationItem.nid).then(data => {
      setCityList(data);
      dispatch(
        accompanyNation({ code: nationItem.nid, name: nationItem.name }),
      );
    });
  };

  const handleCityClick = cityItem => {
    dispatch(accompanyCity({ code: cityItem.cid, name: cityItem.name }));
    const path =
      history.location.state.prevpath === '/accompany'
        ? '/accompany/accSetDate'
        : '/accompany/accList';
    history.push({
      pathname: path,
      state: { prevpath: history.location.pathname },
    });
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <StyledDiv>
      <HeaderContainer container alignItems="center">
        <Grid item>
          <IconButton
            color="inherit"
            onClick={handleBackClick}
            style={{ paddingLeft: '1.5rem' }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h4">어디로 여행 가실건가요?</Typography>
        </Grid>
      </HeaderContainer>

      <ListContainer>
        <ScrollGrid item xs={5}>
          <List component="nav" disablePadding={true}>
            {nationList.map((item, idx) => (
              <ListItem
                key={item.nid}
                divider={true}
                selected={idx === selectedNation}
                onClick={() => handleNationClick(item, idx)}
              >
                <ListItemText primary={item.name} align="center" />
              </ListItem>
            ))}
          </List>
        </ScrollGrid>
        <Divider orientation="vertical" />
        <ScrollGrid item xs={7}>
          <List component="nav" disablePadding={true}>
            {cityList.length !== 0 &&
              cityList.map(item => (
                <ListItem
                  key={item.cid}
                  onClick={() => handleCityClick(item)}
                  divider={true}
                >
                  <ListItemText primary={item.name} align="center" />
                </ListItem>
              ))}
          </List>
        </ScrollGrid>
      </ListContainer>
    </StyledDiv>
  );
};

export default AccompanyLocationSelect;
