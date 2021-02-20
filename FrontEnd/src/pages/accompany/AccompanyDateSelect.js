import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { Button, Grid, Typography, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch } from 'react-redux';
import { accompanyDate } from '../../modules/accompanyCondition';
import { useHistory } from 'react-router';
import moment from 'moment';

const HeaderTypo = styled(Typography)`
  flex: 0 1 auto;
`;

const CalendarStyled = styled(Calendar)`
  border: 0;
  margin: 0 auto;
  width: 90%;
  margin-bottom: 2rem;

  & .react-calendar__year-view__months__month {
    padding: 1.2em 0.5em;
  }
  & .react-calendar__decade-view__years__year {
    padding: 1.2em 0.5em;
  }
  & .react-calendar__century-view__decades__decade {
    padding: 1.2em 0.5em;
  }
  .react-calendar__tile:disabled {
    background: inherit;
    color: #cccccc;
  }
  .react-calendar__navigation button[disabled] {
    background: inherit;
    color: #cccccc;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const AccompanyDateSelect = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const onChange = date => setDate(date);

  moment.lang('ko', {
    weekdays: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  });

  const handleListClick = () => {
    dispatch(accompanyDate(date));
    history.push({
      pathname: '/accompany/accList',
      state: { prevpath: history.location.pathname },
    });
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      style={{ height: 'inherit', backgroundColor: 'white' }}
    >
      <Grid item container alignItems="center">
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
          <HeaderTypo variant="h4" style={{ paddingLeft: '0.5rem' }}>
            언제 동행을 찾고싶나요?
          </HeaderTypo>
        </Grid>
      </Grid>
      <Grid item>
        <CalendarStyled onChange={onChange} value={date} minDate={new Date()} />
      </Grid>
      <Grid item>
        <HeaderTypo variant="h5" align="center">
          {moment(date).format('YYYY-MM-DD (ddd)')}
        </HeaderTypo>
      </Grid>
      <Grid item>
        <ButtonContainer>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={date === null}
            onClick={handleListClick}
          >
            동행 찾기
          </Button>
        </ButtonContainer>
      </Grid>
    </Grid>
  );
};

export default AccompanyDateSelect;
