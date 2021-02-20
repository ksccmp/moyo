import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';
import moment from 'moment';

import AlertDialog from '../common/AlertDialog';
import { openSnackBarAction } from '../../modules/snackBar';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const CustomButton = styled(Button)`
  background-color: #45bfa9 !important;
  color: white !important;
  & + & {
    margin-left: 1rem;
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
    transform: 'translateZ(0)',
    zIndex: '1',
    position: 'absolute',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '80%',
    backgroundColor: '#F2F5F8',
    padding: '5%',
  },
}));

const AddAccompanyModal = ({ isOpen, close, receiver }) => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openAlert, setOpenAlert] = useState(false);

  const classes = useStyles();
  const rootRef = React.useRef(null);

  const addAccompany = async () => {
    var distanceTime = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    var times = [];
    for (var i = 0; i <= distanceTime; i++) {
      times.push(
        moment(startDate)
          .add(i, 'days')
          .format('YYYY-MM-DD'),
      );
    }

    const res = await onAxiosPostAccompany(times);
    if (res) {
      close();
      dispatch(
        openSnackBarAction({
          message: '동행이 등록되었습니다.',
          type: 'success',
        }),
      );
    } else {
      console.error('동행추가 error 발생');
    }
  };

  const onAxiosPostAccompany = async times => {
    return await axios.post(
      'dailyAccompany/create',
      {
        uid: userData.uid,
        accompanyId: receiver.uid,
        days: times,
      },
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const alertClose = () => {
    setOpenAlert(false);
  };

  const alertConfirm = () => {
    addAccompany();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  return isOpen ? (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{ marginBottom: '10%' }}>
                <DatePicker
                  disablePast
                  format="yyyy/MM/dd"
                  label="시작날짜"
                  value={startDate}
                  onChange={setStartDate}
                />
              </Grid>

              <Grid item style={{ marginBottom: '10%' }}>
                <DatePicker
                  disablePast
                  minDate={startDate}
                  format="yyyy/MM/dd"
                  label="종료날짜"
                  value={endDate}
                  onChange={setEndDate}
                />
              </Grid>

              <Grid item>
                <CustomButton onClick={close}>취소</CustomButton>
                <CustomButton
                  onClick={() => {
                    setOpenAlert(true);
                  }}
                >
                  확인
                </CustomButton>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      </Modal>
      <AlertDialog
        open={openAlert}
        title={
          moment(startDate).format('YYYY/MM/DD') +
          ' ~ ' +
          moment(endDate).format('YYYY/MM/DD')
        }
        contents="해당 날짜에 동행을 추가하시겠습니까?"
        onConfirm={alertConfirm}
        onClose={alertClose}
      />
    </div>
  ) : null;
};

export default AddAccompanyModal;
