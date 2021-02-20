import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { navigationSelect } from '../../modules/baseNavigation';
import MoyoIcon from '../../assets/icon/icon_moyo_white.svg';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';

const PersonalMain = ({ round, topindex, bottomindex, onClickImage }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [topClick, setTopClick] = useState(false);
  const [bottomClick, setBottomClick] = useState(false);

  const srcs = [
    'https://www.costco.co.kr/medias/sys_master/images/h48/h1d/9867844550686.jpg',
    'https://img.danawa.com/prod_img/500000/351/074/img/3074351_1.jpg?shrink=500:500&_v=20180711121946',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEcs2tKUsXmnn2-GOfcSEDvlu9pEQVywRufxRswBVVVV67Lnsl',
    'https://lh3.googleusercontent.com/proxy/VhgxxjZ2v9pKzTJvvA3zoitMrPaqD0vSNv2ZEZNb1M6_CD4K2rZOAdvx68XMUrRXI3iCvJsaB7WPZCaXxqV5RbQUi4ILzbxWmTnJsdLTVjGbyckn',
    'https://www.costco.co.kr/medias/sys_master/images/hc2/h95/9867844386846.jpg',
    'https://lh3.googleusercontent.com/proxy/onBcTS1ZNWabofxexOm-RoIXul2NUoV0CVEEp5LS0FXO6nIICwDHL2Z0jQYdsZZdqEqyFqgDZDA_CH1eslhcetMg4mIH79rxSA311rTM1UghU9tK',
    'https://www.thinkfood.co.kr/news/photo/201608/70590_85860_3650.jpg',
    'https://moimoimall.allbrand.co.kr/data/sites/605/2017/07/20170713_074409.jpg',
    'https://lh3.googleusercontent.com/proxy/c8dFY6lH-b1XenUU-Lay79taw66u8CZP-NVafnK_SpkjV7suvmCCIbjQk7VOC24hgCYgPBkpSMt_9fHxztvRM7AoipfScHuPJ6ByMIel9U-bWZCL',
    'https://gdimg.gmarket.co.kr/1161380136/still/600?ver=1510553484',
    'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F1340B0384ED65DFA33',
    'https://m.handokmall.kr/web/product/big/201612/1095_shop7_375800.jpg',
    'https://image.fnnews.com/resource/media/image/2006/01/03/200601031405225004_l.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5jSn1FJWU6tNcXZU1XhuS7_dqUGElcf0eyvxMeXjQrW9f2XHB',
    'https://img3.tmon.kr/cdn3/deals/2019/06/13/2065727870/original_2065727870_front_229c7_1560414375production.jpg',
    'https://coffeehome.co.kr/web/product/big/201702/176_shop1_239611.jpg',
  ];

  const imageNames = [
    '신라',
    '진라',
    '너구',
    '짜파',
    '육개',
    '참깨',
    '부대',
    '팔도',
    '라볶',
    '스파',
    '쌀국',
    '불닭',
    '틈새',
    '오모',
    '스낵',
    '삼양',
  ];

  const topAction = () => {
    setTopClick(true);
    setTimeout(() => {
      setTopClick(false);
      onClickImage(topindex);
    }, 500);
  };

  const bottomAction = () => {
    setBottomClick(true);
    setTimeout(() => {
      setBottomClick(false);
      onClickImage(bottomindex);
    }, 500);
  };

  const isClickPossible = () => {
    if (bottomClick === false && topClick === false) {
      return true;
    } else {
      return false;
    }
  };

  const handleHomeClick = () => {
    dispatch(navigationSelect('accompany'));
    history.push({
      pathname: '/accompany',
    });
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#4fdbc2' }}>
        <Toolbar style={{ padding: '0%' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={2}>
              <IconButton color="inherit" onClick={handleHomeClick}>
                <img
                  alt="icon_moyo_white"
                  src={MoyoIcon}
                  style={{ height: '2rem' }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'center' }}>
              <Typography variant="h4">{round}강</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div id="showImage">
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ padding: '5%', height: '100%' }}
        >
          <Grid item xs={6} style={{ maxWidth: '100%', width: '100%' }}>
            <Grid
              container
              alignItems="center"
              justify="center"
              onClick={() => {
                isClickPossible() && topAction();
              }}
              style={{
                padding: '5%',
                border: topClick ? '6px solid #ccdff1' : '',
              }}
            >
              <Grid item xs={6}>
                <Avatar
                  alt="위 이미지"
                  src={srcs[topindex]}
                  style={{
                    width: '175px',
                    height: '175px',
                    borderRadius: '50%',
                  }}
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="h6">
                  <b>{imageNames[topindex]}</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <div
            style={{
              textAlign: 'center',
              marginTop: '10%',
              marginBottom: '10%',
              backgroundColor: '#4AC8D9',
              borderRadius: '30%',
              padding: '3%',
            }}
          >
            <Typography variant="h5">
              자신의 <span style={{ color: 'red' }}>성향</span>을 선택해주세요
            </Typography>
          </div>

          <Grid item xs={6} style={{ maxWidth: '100%', width: '100%' }}>
            <Grid
              container
              alignItems="center"
              justify="center"
              onClick={() => {
                isClickPossible() && bottomAction();
              }}
              style={{
                padding: '5%',
                border: bottomClick ? '6px solid #ccdff1' : '',
              }}
            >
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="h6">
                  <b>{imageNames[bottomindex]}</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Avatar
                  alt="아래 이미지"
                  src={srcs[bottomindex]}
                  style={{
                    width: '175px',
                    height: '175px',
                    borderRadius: '50%',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PersonalMain;
