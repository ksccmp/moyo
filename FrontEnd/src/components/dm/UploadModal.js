import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, LinearProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
    transform: 'translateZ(0)',
    zIndex: 1,
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
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 3),
  },
}));

const UploadModal = ({ isOpen, close }) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

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
          <Typography
            variant="h6"
            align="center"
            id="server-modal-title"
            style={{ margin: '1rem 0' }}
          >
            Uploading...
          </Typography>
          <p id="server-modal-description">
            <LinearProgress />
          </p>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default UploadModal;
