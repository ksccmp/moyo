import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const CustomCard = styled(Card)`
  width: 85%;
  height: 85%;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const BannerDateTypo = styled(Typography)`
  padding: 0 !important;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.05rem;
`;

const TripPaper = ({ scheduleInfo, onClickOpenUpdate, onClickOpenDelete }) => {
  const dateToStr = date => moment(date).format('YYYY.MM.DD');

  return (
    <CustomCard elevation={0} style={{ width: '100%', marginBottom: '1rem' }}>
      <CardActionArea>
        <CardMedia
          image={`https://storage.googleapis.com/moyo-cloud-storage/city/${scheduleInfo.cid}.svg`}
          alt="city image"
          style={{ height: '6rem' }}
        />
        <CardContent
          style={{
            padding: '0.4rem 0 0 0.7rem',
          }}
        >
          <BannerDateTypo
            align="left"
            style={{
              fontSize: '1rem',
              fontWeight: '700',
              padding: '0 0 0.2rem 0',
              letterSpacing: '-0.05rem',
            }}
          >
            {dateToStr(scheduleInfo.startDate)} ~{' '}
            {dateToStr(scheduleInfo.endDate)}
          </BannerDateTypo>
          <Typography
            align="left"
            color="textSecondary"
            style={{
              fontSize: '0.6rem',
              marginRight: '0.5rem',
            }}
            component="span"
          >
            {scheduleInfo.nation}
          </Typography>
          <Typography
            align="left"
            style={{ fontSize: '1rem' }}
            component="span"
          >
            {scheduleInfo.city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ paddingTop: '0rem', paddingBottom: '0rem', float: 'right' }}
      >
        <Button
          size="small"
          color="secondary"
          onClick={() => onClickOpenUpdate(scheduleInfo)}
          style={{ padding: '0' }}
        >
          수정
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onClickOpenDelete(scheduleInfo.slistId)}
          style={{ padding: '0' }}
        >
          삭제
        </Button>
      </CardActions>
    </CustomCard>
  );
};

export default TripPaper;
