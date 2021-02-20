import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';

import { getPostListAction, getInfoWindow } from '../../modules/postmap';
import { openModalAction, closeModalAction } from '../../modules/progressModal';

import Grid from '@material-ui/core/Grid';
import PostmapGoogle from '../../components/postmap/PostmapGoogle';
import PostmapChat from '../../components/postmap/PostmapChat';
import PostmapListPaper from '../../components/postmap/PostmapListPaper';
import styled from 'styled-components';
import NoDataPage from '../../components/common/NoDataPage';
import { Typography } from '@material-ui/core';

const PostTypo = styled(Typography)`
  font-size: 0.95rem !important;
  margin: 0.3rem 1.5rem !important;
`;

const ScrollGrid = styled(Grid)`
  flex: 1;
  overflow: auto;
`;
const MapGrid = styled(Grid)`
  padding: 1rem;
`;

const Postmap = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);

  const pos = useSelector(state => state.postmap.pos);

  const [postListTop, setPostListTop] = useState([]);
  const [postListExceptTop, setPostListExceptTop] = useState([]);
  const [curTime, setCurTime] = useState('');

  useEffect(() => {
    dispatch(openModalAction());
    onInit();
  }, []);

  const onInit = async () => {
    const res = await onAxiosGetTime();
    setCurTime(res.data.data);
  };

  const getFetchMarker = async pos => {
    return await axios.get(
      `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const onAxiosGetTime = async () => {
    return await axios.get('DM/getTime', {
      headers: { userToken: userData.userToken },
    });
  };

  const likePost = async pmId => {
    return await axios.put(
      `postmap/likePostmap/`,
      {
        pmId: pmId,
        pmLikeId: 0,
        uid: userData.uid,
      },
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const listFetch = async curpos => {
    const res = await getFetchMarker(curpos);
    dispatch(getPostListAction(res.data.data));

    const TOP = 3;
    var tempList = [];

    for (let i = 0; i < res.data.data.length; i++) {
      tempList.push(res.data.data[i]);
    }

    tempList.sort(function(a, b) {
      return b.likes - a.likes;
    });

    var listTop = [];
    for (var i = 0; i < TOP; i++) {
      if (tempList[i]) {
        listTop.push(tempList[i]);
      }
    }

    setPostListTop(listTop);

    var listExceptTop = [];
    res.data.data.forEach(data => {
      for (var i = 0; i < TOP; i++) {
        if (listTop[i].pmId === data.pmId) {
          break;
        }

        if (i === TOP - 1) {
          listExceptTop.push(data);
        }
      }
    });

    setPostListExceptTop(listExceptTop);
    dispatch(closeModalAction());
  };

  const handlePostClick = chat => {
    dispatch(getInfoWindow(chat));
    listFetch(pos);
  };

  const handleLikeClick = async chat => {
    const res = await likePost(chat.pmId);
    if (res) {
      listFetch(pos);
    }
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <MapGrid item>
        <PostmapGoogle listFetch={listFetch} />
      </MapGrid>
      <Grid item style={{ marginBottom: '0.5rem' }}>
        <PostmapChat listFetch={listFetch} />
      </Grid>
      <ScrollGrid item>
        {postListTop.length > 0 || postListExceptTop.length > 0 ? (
          <div id="chatList">
            <div id="chatListTop">
              <PostTypo variant="subtitle2">베스트 포스트맵</PostTypo>
              {postListTop.map(chat => (
                <PostmapListPaper
                  key={chat.pmId}
                  curTime={curTime}
                  chat={chat}
                  onPostClick={() => handlePostClick(chat)}
                  onLikeClick={() => handleLikeClick(chat)}
                />
              ))}
            </div>
            <div id="chatListBottom">
              <PostTypo variant="subtitle2">주변 포스트맵 리스트</PostTypo>
              {postListExceptTop.map(chat => (
                <PostmapListPaper
                  key={chat.pmId}
                  curTime={curTime}
                  chat={chat}
                  onPostClick={() => handlePostClick(chat)}
                  onLikeClick={() => handleLikeClick(chat)}
                />
              ))}
            </div>
          </div>
        ) : (
          <NoDataPage text="등록된 포스트맵이 없어요!" />
        )}
      </ScrollGrid>
    </Grid>
  );
};

export default Postmap;
