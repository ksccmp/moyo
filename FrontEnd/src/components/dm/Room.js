import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import moment from 'moment';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const TextTypo = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RoomContainer = styled(Grid)`
  margin-top: 0.5rem;
  & + & {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #cccccc;
  }
`;

const Room = ({ roomId, receiverId, lastMessage, timeStamp, read }) => {
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);
  const [receiver, setReceiver] = useState('');
  const [curTime, setCurTime] = useState('');

  const onAxiosGetTime = async () => {
    return await axios.get('DM/getTime', {
      headers: { userToken: userData.userToken },
    });
  };

  const onAxiosGetUser = async id => {
    return await axios.get('DM/getUser?uid=' + id, {
      headers: { userToken: userData.userToken },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res1 = await onAxiosGetTime();
      setCurTime(res1.data.data);
      const res2 = await onAxiosGetUser(receiverId);
      setReceiver(res2.data.data);
    };
    getData();
  }, []);

  const goDmRoom = () => {
    history.push({
      pathname: '/dmroom/' + receiverId,
    });
  };

  return (
    receiver && (
      <RoomContainer container alignItems="center" onClick={goDmRoom}>
        <Grid item xs={2}>
          <Avatar alt="리시버의 이미지" src={receiver.image} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid
              item
              xs={6}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              <TextTypo
                variant="subtitle2"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {receiver.nickname}
              </TextTypo>
            </Grid>
            <Grid item xs={6} style={{ maxWidth: '100%' }}>
              <TextTypo
                variant="body2"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {lastMessage}
              </TextTypo>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          {read === false && (
            <FiberManualRecordIcon fontSize="small" style={{ color: 'red' }} />
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" style={{ float: 'right' }}>
            {moment(timeStamp).format('YYYY/MM/DD') ===
            moment(curTime).format('YYYY/MM/DD')
              ? moment(timeStamp).format('LT')
              : moment(timeStamp).format('YYYY/MM/DD')}
          </Typography>
        </Grid>
      </RoomContainer>
    )
  );
};

export default Room;
