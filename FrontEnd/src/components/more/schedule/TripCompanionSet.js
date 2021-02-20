import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Avatar, Button } from '@material-ui/core';
import axios from '../../../api/axios';
import { useHistory } from 'react-router-dom';
import OtherProfile from '../../common/OtherProfile';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  rootAvatar: {},
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: '0.3rem',
  },
}));

const TripCompanionSet = ({
  companionInfo,
  onClickOpenUpdate,
  onClickOpenDelete,
}) => {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(false);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    setProfileId(companionInfo.accompanyId);
  }, []);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Avatar
            alt={companionInfo.accompanyNickname}
            src={companionInfo.accompanyImage}
            className={classes.medium}
            onClick={() => setOpenProfile(true)}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          xs={9}
          style={{ paddingLeft: '0.5rem', margin: '0' }}
        >
          <Grid item>
            <Typography
              style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                padding: '0.8rem 0',
              }}
            >
              {companionInfo.accompanyNickname}
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              position: 'relative',
              top: '0.3rem',
              left: '9.8rem',
            }}
          ></Grid>
        </Grid>
      </Grid>
      {profileId && (
        <OtherProfile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          otherUserId={companionInfo.accompanyId}
        />
      )}
    </>
  );
};

export default TripCompanionSet;
