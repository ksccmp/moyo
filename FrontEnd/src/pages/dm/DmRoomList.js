import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as firebase from 'firebase';
import styled from 'styled-components';
import { openModalAction, closeModalAction } from '../../modules/progressModal';
import { navigationSelect } from '../../modules/baseNavigation';
import MoyoIcon from '../../assets/icon/icon_moyo_white.svg';

import { Grid } from '@material-ui/core';

import Room from '../../components/dm/Room';
import BaseAppBar from '../../components/common/BaseAppBar';
import NoDataPage from '../../components/common/NoDataPage';

const ListContainer = styled(Grid)`
  flex: 1;
  width: 95%;
  margin: 0 auto !important;
`;

const DmRoomList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    dispatch(openModalAction());
    onInit();
  }, []);

  // init
  const onInit = async () => {
    dispatch(navigationSelect('DM'));

    firebase.database().goOnline();

    loadRoomList(userData);
  };

  //채팅방 목록리스트 호출
  const loadRoomList = sender => {
    addLoadRoomList(sender);
    changeLoadRoomList(sender);
  };

  const addLoadRoomList = sender => {
    var addLoadRoomFirebase = firebase
      .database()
      .ref('UserRooms/' + sender.uid);
    addLoadRoomFirebase.off();

    var count = 0;
    const callback = snapshot => {
      var val = snapshot.val();

      var RoomInfo = {
        roomId: val.roomId,
        receiverId: val.receiverId,
        lastMessage: val.lastMessage,
        timeStamp: val.timeStamp,
        read: val.read,
      };

      setRoomList(prevState => [...prevState, RoomInfo]);
      if (count > 1) {
        count = count - 1;
      } else {
        dispatch(closeModalAction());
      }
    };

    addLoadRoomFirebase.once('value', snapshot => {
      if (snapshot.val()) {
        count = Object.keys(snapshot.val()).length;
      } else {
        dispatch(closeModalAction());
      }
    });

    addLoadRoomFirebase.orderByChild('timeStamp').on('child_added', callback); // 메세지를 받을 때 마다 목록을 갱신시키기 위해 once메소드가 아닌 on메소드 사용
  };

  const changeLoadRoomList = sender => {
    var changeLoadRoomListFirebase = firebase
      .database()
      .ref('UserRooms/' + sender.uid);

    const callback = snapshot => {
      var val = snapshot.val();
      setRoomList(prevState =>
        prevState.filter(room => room.roomId !== val.roomId),
      );

      setRoomList(prevState => [...prevState, val]);
    };

    changeLoadRoomListFirebase.on('child_changed', callback);
  };

  const handleHomeClick = () => {
    dispatch(navigationSelect('accompany'));
    history.push({
      pathname: '/accompany',
    });
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Grid item>
        <BaseAppBar
          text="채팅목록"
          leftIcon={
            <img
              alt="icon_moyo_white"
              src={MoyoIcon}
              style={{ height: '2rem' }}
            />
          }
          leftClick={handleHomeClick}
        />
      </Grid>
      <ListContainer item>
        {roomList.length > 0 ? (
          roomList
            .reverse()
            .map(room => (
              <Room
                key={room.roomId}
                roomId={room.roomId}
                receiverId={room.receiverId}
                lastMessage={room.lastMessage}
                timeStamp={room.timeStamp}
                read={room.read}
              ></Room>
            ))
        ) : (
          <NoDataPage text="채팅 내역이 존재하지 않습니다" />
        )}
      </ListContainer>
    </Grid>
  );
};

export default DmRoomList;
