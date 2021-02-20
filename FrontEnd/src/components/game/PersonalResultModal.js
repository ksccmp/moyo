import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '4%',
    textAlign: 'center',
  },
}));

const PersonalResultModal = ({ closeResult, resultMessage }) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return resultMessage ? (
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
            <Typography variant="h4">당신의 성향은</Typography>
            <Typography variant="h4" style={{ color: 'red' }}>
              {resultMessage}
            </Typography>
            <Typography variant="h4">입니다.</Typography>
            <img
              alt="라이언 뛰어넘기"
              src="https://item.kakaocdn.net/do/dcabec0932617c4c8adf2a55504119e9f43ad912ad8dd55b04db6a64cddaf76d"
              style={{ width: '80%', height: '50%' }}
            ></img>

            <Button variant="contained" color="primary" onClick={closeResult}>
              홈으로
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  ) : null;
};

export default PersonalResultModal;
