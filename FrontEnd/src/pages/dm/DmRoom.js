import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';
import * as firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import Message from '../../components/dm/Message';
import UploadModal from '../../components/dm/UploadModal';
import { openModalAction, closeModalAction } from '../../modules/progressModal';
import { goProfileBlockAction, goProfileUnBlockAction } from '../../modules/Dm';
import { navigationSelect } from '../../modules/baseNavigation';

import TelegramIcon from '@material-ui/icons/Telegram';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { IconButton, Grid, TextField, Typography } from '@material-ui/core';
import AddAccompanyModal from '../../components/dm/AddAccompanyModal';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import BaseAppBar from '../../components/common/BaseAppBar';
import styled from 'styled-components';

const CustomIconButton = styled(IconButton)`
  background-color: #4fc3f7 !important;
  padding: 0.3rem !important;
  & > span > svg {
    color: white;
  }
`;

const MessageTextField = styled(TextField)`
  & > div {
    border-radius: 1rem !important;
    & > input {
      padding: 0.5rem 0.8rem !important;
    }
  }
`;

const DmRoom = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const MAKEID_CHAR = useSelector(state => state.Dm.MAKEID_CHAR);
  const DATETIME_CHAR = useSelector(state => state.Dm.DATETIME_CHAR);
  const userData = useSelector(state => state.auth.userData);

  const [hookReceiver, setHookReceiver] = useState({});
  const [title, setTitle] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [hookRoomId, setHookRoomId] = useState('');
  const [ivalue, setIvalue] = useState('');
  const [uploadModal, setUploadModal] = useState(false);
  const [addAccompanyModal, setAddAccompanyModal] = useState(false);
  const [receiverRead, setReceiverRead] = useState(false);
  const [tempCurTime, setTempCurTime] = useState('');

  const onChangeIvalue = useCallback(e => {
    setIvalue(e.target.value);
  }, []);

  const openAddModal = () => {
    setAddAccompanyModal(true);
    dispatch(goProfileBlockAction());
  };

  const closeAddModal = () => {
    setAddAccompanyModal(false);
    dispatch(goProfileUnBlockAction());
  };

  const openModal = () => {
    setUploadModal(true);
  };

  const closeModal = () => {
    setUploadModal(false);
  };

  useEffect(() => {
    dispatch(openModalAction());
    onInit();
  }, []);

  const onAxiosGetUser = async id => {
    return await axios.get('DM/getUser?uid=' + id, {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 초기 실행
   */
  const onInit = async () => {
    firebase.database().goOnline();

    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // 익명 사용자 로그인
        alert('익명사용자 에러 발생', error);
      });

    var temp = document.getElementById('chatInput');
    temp.focus();

    if (match.params.receiverId) {
      const axiosUserData = await onAxiosGetUser(match.params.receiverId);
      setHookReceiver(axiosUserData.data.data);
      loadRoom(userData, axiosUserData.data.data);
    }
  };

  const waitReceiverRoomChange = (roomId, receiver, roomexist) => {
    const callback = snapshot => {
      if (snapshot.val().read === true) {
        firebase
          .database()
          .ref('LastMessage/' + roomId)
          .once('value')
          .then(snapshot1 => {
            if (snapshot1.val().senderId === userData.uid) {
              setReceiverRead(true);
              var list = document.getElementById('messageList');
              if (list) {
                list.scrollTop = list.scrollHeight;
              }
            } else {
              setReceiverRead(false);
            }
          });
      } else {
        setReceiverRead(false);
      }
    };

    if (roomexist) {
      firebase
        .database()
        .ref('UserRooms/' + receiver.uid + '/' + userData.uid)
        .once('value', callback);
    }

    firebase
      .database()
      .ref('UserRooms/' + receiver.uid)
      .on('child_changed', callback);
  };

  /*
   * 방 로드하기
   */
  const loadRoom = (sender, receiver) => {
    setTitle(receiver.nickname);

    var roomInfo = {};
    firebase
      .database()
      .ref('UserRooms/' + sender.uid + '/' + receiver.uid)
      .once('value', snapshot => {
        if (snapshot.val()) {
          roomInfo.roomId = snapshot.val().roomId;
          roomInfo.roomTitle = snapshot.val().roomTitle;
          loadMessageList(roomInfo.roomId, receiver, true);
        } else {
          roomInfo.roomId =
            MAKEID_CHAR + sender.uid + MAKEID_CHAR + receiver.uid;
          roomInfo.roomTitle = sender.nickname;
          loadMessageList(roomInfo.roomId, receiver);
        }
      });
  };

  /**
   * 메세지 로드
   */
  const loadMessageList = async (roomId, receiver, roomexist) => {
    var loadMessageFirebase = firebase.database().ref('Messages/' + roomId);
    loadMessageFirebase.off();
    if (roomId) {
      var count = 0;
      loadMessageFirebase.once('value', snapshot => {
        if (snapshot.val()) {
          if (Object.keys(snapshot.val()).length > 50) {
            count = 50;
          } else {
            count = Object.keys(snapshot.val()).length;
          }
        } else {
          dispatch(closeModalAction());
        }
      });
      setHookRoomId(roomId);
      waitReceiverRoomChange(roomId, receiver, roomexist);

      const callback = async snapshot => {
        var val = snapshot.val();
        setTempCurTime((await onAxiosGetTime()).data.data);

        const MessageInfo = {
          senderId: val.senderId,
          message: val.message,
          timeStamp: val.timeStamp,
          fileName: val.fileName,
          url: val.url,
        };

        setMessageList(prevState => [...prevState, MessageInfo]);
        if (count > 1) {
          count = count - 1;
        } else {
          dispatch(closeModalAction());
        }
        var list = document.getElementById('messageList');
        if (list) {
          list.scrollTop = list.scrollHeight;
        }

        if (
          val.senderId !== userData.uid &&
          history.location.pathname.indexOf('dmroom/') > 0
        ) {
          firebase
            .database()
            .ref('UserRooms/' + userData.uid + '/' + receiver.uid)
            .once('value')
            .then(snapshot => {
              if (snapshot.val().read === false) {
                firebase
                  .database()
                  .ref('UserRooms/' + userData.uid + '/' + receiver.uid)
                  .update({
                    roomId: snapshot.val().roomId,
                    receiverId: snapshot.val().receiverId,
                    lastMessage: snapshot.val().lastMessage,
                    timeStamp: snapshot.val().timeStamp,
                    read: true,
                  });
              }
            });
        }
      };

      loadMessageFirebase
        .orderByChild('timeStamp')
        .limitToLast(50)
        .on('child_added', callback);
    }
  };

  const onAxiosGetTime = async () => {
    return await axios.get('DM/getTime', {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 메세지 전송
   */
  const saveMessages = async (msg, fileName, url) => {
    if (msg && msg !== '') {
      const res = await onAxiosGetTime();
      if (res) {
        var multiUpdates = {};
        var messageId = firebase.database().ref('Messages/' + hookRoomId).key; // 메세지 키 값 구하기 => push는 자동으로 키값을 생성하면서 데이터를 저장
        //                        즉, 여기서는 자동으로 키를 생성해서 받을 수 있음
        var curTime = res.data.data;
        messageId =
          messageId +
          DATETIME_CHAR +
          moment(curTime).format('YYYYMMDDhhmmssSSS');

        var saveFirebase = firebase.database().ref();

        // 유저별 룸 리스트 저장
        multiUpdates['UserRooms/' + userData.uid + '/' + hookReceiver.uid] = {
          roomId: hookRoomId,
          receiverId: hookReceiver.uid,
          lastMessage: url ? '다운로드' : msg,
          timeStamp: curTime,
          read: true,
        };

        multiUpdates['UserRooms/' + hookReceiver.uid + '/' + userData.uid] = {
          roomId: hookRoomId,
          receiverId: userData.uid,
          lastMessage: url ? '다운로드' : msg,
          timeStamp: curTime,
          read: false,
        };

        saveFirebase.update(multiUpdates);

        multiUpdates = {};

        // 메세지 저장
        multiUpdates['Messages/' + hookRoomId + '/' + messageId] = {
          senderId: userData.uid,
          message: msg,
          timeStamp: curTime,
          fileName: fileName ? fileName : null,
          url: url ? url : null,
        };

        multiUpdates['LastMessage/' + hookRoomId] = {
          senderId: userData.uid,
          messageId: messageId,
        };

        saveFirebase.update(multiUpdates);
      }
    }
  };

  const loadMessage = () => {
    var temp = document.getElementById('chatInput');
    temp.focus();
    saveMessages(ivalue);
    setIvalue('');
  };

  const onAttachButton = () => {
    var attachButton = document.getElementById('attachfile');
    attachButton.click();
  };

  const onAttachFile = e => {
    var files = e.target.files;
    if (files) {
      openModal();
      var fileName = files[0].name;
      var path =
        moment(firebase.database.ServerValue.TIMESTAMP).format(
          'YYYYMMDDhhmmssSSS',
        ) +
        '/' +
        hookRoomId +
        '/' +
        userData.uid +
        '/' +
        fileName;

      var attachFirebase = firebase
        .storage()
        .ref()
        .child(path)
        .put(files[0]);

      const callbackProgress = snapshot => {
        // 진행과정
      };

      const callbackError = error => {
        // 에러발생
        closeModal();
        alert('업로드 중 에러가 발생했습니다.');
      };

      const callbackComplete = () => {
        // 완료
        // 프로그레스바 닫기
        closeModal();
        // 완료 다운로드 링크 메세지 보내기
        firebase
          .storage()
          .ref()
          .child(path)
          .getDownloadURL()
          .then(url => {
            saveMessages('다운로드', fileName, url);
          });
      };

      // 프로그레스바

      attachFirebase.on(
        'state_changed',
        callbackProgress,
        callbackError,
        callbackComplete,
      );
    }
  };

  var lastMessageUserId = '';
  var lastTimeStamp = '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit',
        height: 'inherit',
      }}
    >
      <BaseAppBar
        text={title}
        leftIcon={<ArrowBackIosIcon />}
        leftClick={() => {
          dispatch(navigationSelect('accompany'));
          history.goBack();
        }}
        rightText="동행"
        rightClick={openAddModal}
      />
      <UploadModal isOpen={uploadModal} close={closeModal} />
      <AddAccompanyModal
        isOpen={addAccompanyModal}
        close={closeAddModal}
        receiver={hookReceiver}
      />

      <div
        id="messageList"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          marginTop: '1%',
        }}
      >
        {messageList.map((message, index) => {
          var tempLastMessageUserId = lastMessageUserId;
          var tempLastTimeStamp = lastTimeStamp;
          lastMessageUserId = message.senderId;
          lastTimeStamp = message.timeStamp;

          return (
            <Message
              key={index}
              senderId={message.senderId}
              image={hookReceiver.image}
              message={message.message}
              timeStamp={message.timeStamp}
              fileName={message.fileName}
              url={message.url}
              lastMessageUserId={tempLastMessageUserId}
              lastTimeStamp={tempLastTimeStamp}
              curTime={tempCurTime}
            />
          );
        })}

        {receiverRead && (
          <Typography
            variant="caption"
            style={{ float: 'right', marginRight: '2%', marginTop: '-2%' }}
          >
            읽음
          </Typography>
        )}
      </div>

      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ padding: '0.5rem 0.3rem' }}
      >
        <Grid className="moyo_center_grid" item xs={2}>
          <CustomIconButton onClick={onAttachButton}>
            <AttachFileIcon />
          </CustomIconButton>
        </Grid>
        <Grid item xs={8}>
          <MessageTextField
            id="chatInput"
            variant="outlined"
            onChange={onChangeIvalue}
            value={ivalue}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} className="moyo_center_grid">
          <CustomIconButton onClick={loadMessage}>
            <TelegramIcon />
          </CustomIconButton>
        </Grid>
      </Grid>

      <input
        type="file"
        id="attachfile"
        style={{ display: 'none' }}
        onChange={onAttachFile}
      ></input>
    </div>
  );
};

export default DmRoom;
