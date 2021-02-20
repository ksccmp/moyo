import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

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
    width: '25%',
    backgroundColor: '#45BFA9',
    color: 'white',
    padding: '3%',
    textAlign: 'center',
  },
}));

const PersonalRoundModal = ({ openRound, closeRound, round }) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return openRound ? (
    <div>
      {closeRound()}
      <Fade in={openRound} timeout={1800}>
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
              <h2>{round}강</h2>
            </div>
          </Modal>
        </div>
      </Fade>
    </div>
  ) : null;
};

export default PersonalRoundModal;
