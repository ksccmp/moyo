import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';

/*
  1. open과 close Action을 import한다. 보통 'import { openModalAction, closeModalAction } from '../../modules/progressModal';' 이렇게 import
  2. dispatch를 설정한다. 보통 const dispatch = useDispatch(); 이렇게 설정
  3. uesEffect를 통해 페이지 로드가 이루어지기 전 dispatch(openModalAction()); 를 작성
  4. 모든 페이지 로드가 끝날 시점에 dispatch(closeModalAction()); 을 작성
*/

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
    position: 'absolute',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div:first-child': {
      backgroundColor: '#F2F5F8 !important',
      height: '100%',
      width: '100%',
      position: 'relative !important',
    },
  },
  paper: {
    width: '30%',
    color: 'white',
    padding: '3%',
    textAlign: 'center',
    position: 'fixed',
  },
}));

const ProgressModal = () => {
  const openProgress = useSelector(state => state.progressModal.progressModal);

  const classes = useStyles();
  const rootRef = React.useRef(null);

  return openProgress ? (
    <div>
      <div className={classes.root} ref={rootRef}>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          className={classes.modal}
          container={() => rootRef.current}
        >
          <div className={classes.paper}>
            <Fade in={true} timeout={2500}>
              <div>
                <Typography style={{ color: '#4A44A6', marginBottom: '10%' }}>
                  Loading ...
                </Typography>
              </div>
            </Fade>
            <CircularProgress
              size="3.5rem"
              thickness={4.2}
              style={{ color: '#4A44A6' }}
            />
          </div>
        </Modal>
      </div>
    </div>
  ) : null;
};

export default ProgressModal;
