import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';

const CustomKeyboardDatePicker = styled(KeyboardDatePicker)`
  & > div {
    & > div > button {
      padding: 0 !important;
      & > span > svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    & > input {
      font-size: 0.8rem;
    }
  }
`;

const CustomTextField = styled(TextField)`
  & > label {
    font-size: 0.8rem;
  }
  & > div {
    font-size: 0.8rem;
    & > div {
      padding-bottom: 0.3rem !important;
    }
  }
`;

const FormTypo = styled(Typography)`
  text-align: left;
  font-weight: 700 !important;
`;

const MainForm = ({ ...props }) => {
  return (
    <Grid container direction="column" style={{ padding: '1rem' }}>
      <Grid item container justify="center" alignItems="center">
        <Grid xs={3} item>
          <FormTypo style={{ letterSpacing: '-0.05rem' }}>제목</FormTypo>
        </Grid>
        <Grid xs={9} item>
          <CustomTextField
            id="titleInput"
            fullWidth={true}
            value={props.title}
            onChange={props.onTitleChange}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: '1rem' }}
      >
        <Grid item xs={3}>
          <FormTypo style={{ letterSpacing: '-0.05rem' }}>여행날짜</FormTypo>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={4}>
            <CustomKeyboardDatePicker
              disablePast
              disableToolbar
              placeholder="시작"
              autoOk
              variant="inline"
              format="yyyy-MM-dd"
              id="startDatePicker"
              value={props.startDate}
              onChange={props.onStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ paddingRight: '0rem' }}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1" align="center">
              ~
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomKeyboardDatePicker
              disablePast
              disableToolbar
              placeholder="종료"
              autoOk
              variant="inline"
              format="yyyy-MM-dd"
              id="endDatePicker"
              value={props.endDate}
              onChange={props.onEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={3}>
          <FormTypo style={{ letterSpacing: '-0.05rem', paddingTop: '1.2rem' }}>
            장소
          </FormTypo>
        </Grid>
        <Grid item xs={4}>
          <CustomTextField
            id="nationSelect"
            select
            label="나라"
            size="small"
            fullWidth={true}
            value={props.nation}
            onChange={props.onNationChange}
          >
            {props.nationList.map(item => (
              <MenuItem key={item.nid} value={item.nid}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ letterSpacing: '-0.05rem', paddingTop: '1.0rem' }}
          >
            /
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CustomTextField
            id="citySelect"
            select
            label="도시"
            size="small"
            fullWidth={true}
            disabled={`${props.nation}` ? false : true}
            value={props.city}
            onChange={props.onCityChange}
          >
            {props.cityList.map(item => (
              <MenuItem key={item.cid} value={item.cid}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainForm;
