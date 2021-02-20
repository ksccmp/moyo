import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';

import { closeSnackBarAction } from '../../modules/snackBar';

/*
  1. openSnackBarAction을 import한다. 보통 'import { openSnackBarAction } from '../../modules/snackBar';' 이렇게 import
  2. dispatch를 설정한다. 보통 const dispatch = useDispatch(); 이렇게 설정
  3. 스낵바가 필요한 시점에 dispatch(openSnackBarAction('Message'));를 작성한다. 이런식으로, dispatch(openSnackBarAction('동행이 등록되었습니다.'));
*/
const SnackBar = () => {
  const dispatch = useDispatch();

  const message = useSelector(state => state.snackBar.snackBarMessage);
  const open = useSelector(state => state.snackBar.snackBarOpen);
  const type = useSelector(state => state.snackBar.snackBarType);

  const closeSnackBar = () => {
    dispatch(closeSnackBarAction());
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const NoTypeSnackBar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={closeSnackBar}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackBar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      style={{ bottom: '4rem' }}
    />
  );

  const TypeSnackBar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={closeSnackBar}
      style={{ bottom: '4rem' }}
    >
      {type === 'warning' ? (
        <Alert
          severity={type}
          style={{ color: 'black', fontWeight: '700' }}
          onClose={closeSnackBar}
        >
          {message}
        </Alert>
      ) : (
        <Alert severity={type} onClose={closeSnackBar}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );

  return open && (type ? <TypeSnackBar /> : <NoTypeSnackBar />);
};
export default SnackBar;
