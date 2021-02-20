import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { storeSchedule } from '../../modules/morePlanTravel';
import axios from '../../api/axios';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TripPaper from './schedule/TripSchedulePaper';
import { getNationList, getCityList } from '../../api/commonData';
import AlertDialog from '../common/AlertDialog';
import { openSnackBarAction } from '../../modules/snackBar';

const PlanTravel = () => {
  const useStyles = makeStyles(theme => ({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const planTravelList = useSelector(
    state => state.morePlanTravel.planTravelList,
  );
  const [nationList, setNationList] = useState([]);
  const [nation, setNation] = useState('');
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState('');
  const [nationUpdate, setNationUpdate] = useState('');
  const [cityListUpdate, setCityListUpdate] = useState([]);
  const [cityUpdate, setCityUpdate] = useState('');

  let todayDate = Date();

  const [selectedStartDate, setSelectedStartDate] = useState(todayDate);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStartDateUpdate, setSelectedStartDateUpdate] = useState('');
  const [selectedEndDateUpdate, setSelectedEndDateUpdate] = useState('');
  const [selectedListId, setSelectedListId] = useState('');

  useEffect(() => {
    getNationList().then(data => {
      setNationList(data);
    });
  }, []);

  const handleChangeNation = async nationItem => {
    setNation(nationItem.target.value);
    getCityList(nationItem.target.value).then(data => {
      setCityList(data);
    });
  };

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  // useEffect(() => {
  //   setSelectedStartDate(selectedDate);
  // }, [selectedDate]);

  useEffect(() => {
    setSelectedEndDate(selectedStartDate);
  }, [selectedStartDate]);

  const handleClickOpenCreate = () => {
    setSelectedStartDate(todayDate);
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setSelectedStartDate(todayDate);
    setSelectedEndDate(todayDate);
    setNation('');
    setCityList([]);
    setOpenCreate(false);
  };

  const handleClickOpenUpdate = async item => {
    setNationUpdate(item.nid);
    getCityList(item.nid).then(data => {
      setCityListUpdate(data);
      setCityUpdate(item.cid);
    });
    setSelectedStartDateUpdate(item.startDate);
    setSelectedEndDateUpdate(item.endDate);
    setSelectedListId(item.slistId);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const postPlanTravelServer = async () => {
    try {
      return await axios.post(
        'scheduleList/create',
        {
          uid: userData.uid,
          cid: city,
          nid: nation,
          startDate: moment(selectedStartDate).format('YYYY-MM-DD'),
          endDate: moment(selectedEndDate).format('YYYY-MM-DD 12:00:00'),
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getSchedule = async () => {
    try {
      return await axios.get(`scheduleList/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [postClick, setPostClick] = useState(true);

  const postPlanTravel = async () => {
    if (postClick && city && nation) {
      await postPlanTravelServer();
      const schData = await getSchedule();
      dispatch(storeSchedule(schData.data.data));
      setSelectedStartDate(todayDate);
      setSelectedEndDate(todayDate);
      setNation('');
      setCityList([]);
      setOpenCreate(false);
      setPostClick(false);
      dispatch(
        openSnackBarAction({
          message: '일정이 생성되었습니다.',
          type: 'success',
        }),
      );
      setTimeout(() => {
        setPostClick(true);
      }, 1000);
    } else {
      dispatch(
        openSnackBarAction({
          message: '나라와 도시를 선택해주세요.',
          type: 'warning',
        }),
      );
    }
  };

  const deleteSchedule = async sId => {
    try {
      return await axios.delete(`scheduleList/delete/${sId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSchedule = async () => {
    await deleteSchedule(deleteItem);
    const schData = await getSchedule();
    dispatch(storeSchedule(schData.data.data));
    setDeleteItem('');
    setOpenDelete(false);
    dispatch(
      openSnackBarAction({
        message: '일정이 삭제되었습니다.',
        type: 'success',
      }),
    );
  };

  const handleClickOpenDelete = sId => {
    setOpenDelete(true);
    setDeleteItem(sId);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteItem('');
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');

  const newTravelList = planTravelList.map(item => (
    // selectedDate.diff(item.startDate, 'day') >= 0 && item.endDate.diff(selectedDate, 'day') >= 0
    <Grid container item>
      <Grid item xs={12}>
        <TripPaper
          scheduleInfo={item}
          onClickOpenUpdate={handleClickOpenUpdate}
          onClickOpenDelete={handleClickOpenDelete}
        />
      </Grid>
    </Grid>
  ));

  const handleChangeNationUpdate = async event => {
    setNationUpdate(event.target.value);
    getCityList(event.target.value).then(data => {
      setCityListUpdate(data);
      setCityUpdate('');
    });
  };

  const handleChangeCityUpdate = event => {
    setCityUpdate(event.target.value);
  };

  const putPlanTravelServer = async () => {
    try {
      return await axios.put(
        'scheduleList/update',
        {
          uid: userData.uid,
          cid: cityUpdate,
          nid: nationUpdate,
          slistId: selectedListId,
          startDate: moment(selectedStartDateUpdate).format('YYYY-MM-DD'),
          endDate: moment(selectedEndDateUpdate).format('YYYY-MM-DD 12:00:00'),
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const putPlanTravel = async () => {
    // 형식이 맞지 않으면 버그 발생
    if (
      moment(selectedStartDateUpdate) <= moment(selectedEndDateUpdate) &&
      cityUpdate &&
      nationUpdate
    ) {
      await putPlanTravelServer();
      const schData = await getSchedule();
      dispatch(storeSchedule(schData.data.data));
      setOpenUpdate(false);
      dispatch(
        openSnackBarAction({
          message: '일정이 수정되었습니다.',
          type: 'success',
        }),
      );
    } else if (
      moment(selectedStartDateUpdate) > moment(selectedEndDateUpdate)
    ) {
      dispatch(
        openSnackBarAction({
          message: '날짜를 확인해주세요.',
          type: 'warning',
        }),
      );
    } else {
      dispatch(
        openSnackBarAction({
          message: '나라와 도시를 선택해주세요.',
          type: 'warning',
        }),
      );
    }
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <Grid item container justify="space-between">
          <Grid item xs={3}></Grid>
          <Grid item className={classes.center} xs={3}>
            <Button
              variant="contained"
              onClick={handleClickOpenCreate}
              color="primary"
              style={{ padding: '0.3rem 0.5rem' }}
            >
              일정 추가
            </Button>
          </Grid>
        </Grid>
        {newTravelList}
      </Grid>

      <Dialog
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">여행 일정 추가</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="dialog"
              label="시작"
              value={selectedStartDate}
              onChange={setSelectedStartDate}
            />
            <DatePicker
              disableToolbar
              variant="dialog"
              label="끝"
              value={selectedEndDate}
              onChange={setSelectedEndDate}
              minDate={selectedStartDate}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="나라"
            value={nation}
            onChange={handleChangeNation}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {nationList.map(option => (
              <MenuItem key={option.nid} value={option.nid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="도시"
            value={city}
            onChange={handleChangeCity}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {cityList.map(option => (
              <MenuItem key={option.cid} value={option.cid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate} color="primary">
            취소
          </Button>
          <Button onClick={postPlanTravel} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">여행 일정 수정</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="dialog"
              label="시작"
              value={selectedStartDateUpdate}
              onChange={setSelectedStartDateUpdate}
            />
            <DatePicker
              helperText={''}
              disableToolbar
              variant="dialog"
              label="끝"
              value={selectedEndDateUpdate}
              onChange={setSelectedEndDateUpdate}
              minDate={selectedStartDateUpdate}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="나라"
            value={nationUpdate}
            onChange={handleChangeNationUpdate}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {nationList.map(option => (
              <MenuItem key={option.nid} value={option.nid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="도시"
            value={cityUpdate}
            onChange={handleChangeCityUpdate}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {cityListUpdate.map(option => (
              <MenuItem key={option.cid} value={option.cid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            취소
          </Button>
          <Button onClick={putPlanTravel} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>

      <AlertDialog
        open={openDelete}
        title="일정 삭제"
        contents="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteSchedule}
        onClose={handleCloseDelete}
      ></AlertDialog>
    </div>
  );
};

export default PlanTravel;
