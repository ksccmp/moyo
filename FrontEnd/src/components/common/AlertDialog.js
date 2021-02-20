import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

/* 
  1. 쓰려는 페이지에 아래와 같이 정의
  const [open, setOpen] = useState(null);
  const handleDialogClose = () => { setOpen(false);  };
  const handleDialogOpen = () => { setOpen(true);  };
  
  2. return 안에 AlertDialog 컴포넌트 명시
     * onConfirm = {확인버튼을 눌렀을 때 실행할 함수}
    <AlertDialog  open={open}  title="글 삭제" contents="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteClick} onClose={handleDialogClose} ></AlertDialog>

  3. 기존에 삭제를 실행했던 버튼에 onClick={handleDialogOpen} 실행

  */
const AlertDialog = ({ open, title, contents, onConfirm, onClose }) => {
  const handleClose = () => {
    onClose(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="error">
            {contents}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
