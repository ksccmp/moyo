import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Companion from './Companion';
import Memo from './Memo';
import { Grid, Badge, Typography, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

const PlanDaily = () => {
  const useStyles = makeStyles(theme => ({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const planCompanionList = useSelector(
    state => state.morePlanCompanion.planCompanionList,
  );

  const [isCompanion, setIsCompanion] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const checkCompanion = planCompanionList.find(
      item =>
        item.day.split(' ')[0] === selectedDate.toISOString().split('T', 1)[0],
    );
    if (checkCompanion) {
      setIsCompanion(true);
    } else {
      setIsCompanion(false);
    }
  }, [selectedDate]);

  const [companionDays, setCompanionDays] = useState(
    planCompanionList.map(item => item.day.split(' ')[0]),
  );

  const renderDialogDay = (
    day,
    selectedDate,
    isInCurrentMonth,
    dayComponent,
  ) => {
    const date = new Date(day);
    const momentDate = moment(date).format('YYYY-MM-DD');
    const isSelected = isInCurrentMonth && companionDays.includes(momentDate);
    return (
      <Badge color="secondary" variant={isSelected ? 'dot' : undefined}>
        {dayComponent}
      </Badge>
    );
  };

  useEffect(() => {
    setCompanionDays(planCompanionList.map(item => item.day.split(' ')[0]));
  }, [planCompanionList]);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-dialog"
            label="날짜를 선택하세요"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{ width: '50%', marginBottom: '1.5rem' }}
            renderDay={renderDialogDay}
          />
        </MuiPickersUtilsProvider>

        {isCompanion && (
          <Grid item>
            <Companion
              setIsCompanion={setIsCompanion}
              selectedDate={selectedDate}
              renderDialogDay={renderDialogDay}
            />
          </Grid>
        )}
        {/* <Grid item>
          <Divider variant="fullWidth" />
        </Grid> */}
        {/* <Grid item>
          <Memo />
        </Grid> */}
      </Grid>
    </>
  );
};

export default PlanDaily;
