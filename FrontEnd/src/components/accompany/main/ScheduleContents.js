import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import moment from '../../../api/moment';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { navigationSelect } from '../../../modules/baseNavigation';
import meerkatIcon from '../../../assets/icon/icon_meerkat.svg';

const HeaderDiv = styled.div`
  position: relative;
  display: block;
  max-height: 200px;
  & > img {
    border-radius: 1.2rem 1.2rem 0rem 0rem;
    width: 100%;
    max-height: 13rem;
    object-fit: cover;
  }
  & > .headerTextDiv {
    border-radius: 1.2rem 1.2rem 0rem 0rem;
    position: absolute;
    width: 99%;
    left: 0.5%;
    top: 0;
    backdrop-filter: brightness(70%);
    text-align: center;
  }
`;

const CompanionAvatar = styled(Avatar)`
  width: 13vw !important;
  height: 13vw !important;
  max-width: 80px !important;
  max-height: 80px !important;
`;

const BottomGrid = styled(Grid)`
  background-color: white;
  width: 100%;
  border-radius: 0rem 0rem 1.2rem 1.2rem;
`;

const HorizonContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  & > .companionContainer {
    display: inline-block;
    margin: 0.4rem 0.9rem;
    text-align: center;
  }
  & > .EmptyBox {
    margin: 0.4rem;
    height: 13vw !important;
    max-height: 80px !important;
  }
`;

const OuterGrid = styled(Grid)`
  background-color: white;
  width: 100%;
  border-radius: 1.2rem 1.2rem 0rem 0rem;
  padding: 0.5rem;
`;
const InnerGrid = styled(Grid)`
  width: 100%;
  margin: 0 auto;
  border-radius: 1rem 1rem 0rem 0rem;
  background-color: #f2f5f8;
  & > div > img {
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    transform: rotateY(180deg);
    filter: opacity(0.5) grayscale(1);
    padding: 1rem;
    width: 75%;
    max-width: 110px;
  }
  & > div > h6 {
    text-align: center;
    color: #919394;
  }
`;

const ScheduleContents = ({ tripSchedule, tripCompanion }) => {
  const [carousrl] = useState(() => createRef());
  const dispatch = useDispatch();
  const history = useHistory();

  const _handleLoadImage = e => {
    carousrl.current.setDimensions();
  };

  const handleMovePlan = () => {
    dispatch(navigationSelect('more'));
    history.push({
      pathname: '/more/morePlan',
      state: { prevpath: '/accompany' },
    });
  };

  const getScheduleTitle = () => {
    return moment.momentDateDayWithoutYear() + ', 오늘의 여행';
  };

  const CustomNoDataPage = () => (
    <OuterGrid>
      <InnerGrid container alignItems="center" justify="center">
        <Grid item container xs={5} alignItems="center" justify="flex-end">
          <img alt="no_data_meerkat" src={meerkatIcon} />
        </Grid>
        <Grid item container xs={7} justify="flex-start">
          <Typography variant="h6">
            오늘 여행일정이
            <br />
            없어요!
          </Typography>
        </Grid>
      </InnerGrid>
    </OuterGrid>
  );

  const TripScheduleItem = ({ item }) => {
    const ImgUrl = item
      ? `https://storage.googleapis.com/moyo-cloud-storage/city/${item.cid}.svg`
      : null;
    return (
      <HeaderDiv>
        {item !== null ? (
          <>
            <img alt="innerImg" src={ImgUrl} onLoad={_handleLoadImage} />
            <div className="headerTextDiv">
              <Typography variant="h6" style={{ color: 'white' }}>
                {item.nation}/{item.city}
              </Typography>
            </div>
          </>
        ) : (
          <CustomNoDataPage />
        )}
      </HeaderDiv>
    );
  };

  return (
    <>
      <Typography variant="h6" style={{ padding: '0.5rem' }}>
        {getScheduleTitle()}
      </Typography>
      <Grid container direction="column" wrap="nowrap">
        <Grid item onClick={handleMovePlan}>
          {tripSchedule.length > 0 ? (
            <Carousel
              ref={carousrl}
              autoplay={tripSchedule.length > 1 ? true : false}
              autoplayInterval={6000}
              swiping={tripSchedule.length > 1 ? true : false}
              wrapAround={tripSchedule.length > 1 ? true : false}
              defaultControlsConfig={{
                pagingDotsStyle: {
                  fill: 'white',
                },
              }}
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
            >
              {tripSchedule.map(item => (
                <TripScheduleItem key={item.slistId} item={item} />
              ))}
            </Carousel>
          ) : (
            <TripScheduleItem item={null} />
          )}
        </Grid>

        <BottomGrid item>
          <HorizonContainer>
            {tripCompanion.length > 0 ? (
              tripCompanion.map(user => (
                <div className="companionContainer" key={user.dacId}>
                  <CompanionAvatar src={user.accompanyImage} />
                  <Typography variant="caption">
                    {user.accompanyNickname}
                  </Typography>
                </div>
              ))
            ) : (
              <div className="EmptyBox" />
            )}
          </HorizonContainer>
        </BottomGrid>
      </Grid>
    </>
  );
};

export default ScheduleContents;
