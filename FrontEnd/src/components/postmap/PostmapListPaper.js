import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import styled from 'styled-components';

const LikeFavoriteIcon = styled(FavoriteIcon)`
  color: red;
`;

const PaperGrid = styled(Grid)`
  background-color: white;
  width: 90% !important;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 0.25rem 1.2rem;
  & + & {
    margin-top: 0.5rem;
  }
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const PostmapListPaper = ({ curTime, chat, onPostClick, onLikeClick }) => {
  const calcTime = time => {
    var distanceTime = (new Date(curTime) - new Date(time)) / (1000 * 60);
    if (distanceTime >= 60) {
      distanceTime = distanceTime / 60;
      if (distanceTime >= 24) {
        distanceTime = Math.ceil(distanceTime / 24);
        return distanceTime + '일 전';
      } else {
        distanceTime = Math.ceil(distanceTime);
        return distanceTime + '시간 전';
      }
    } else {
      distanceTime = Math.ceil(distanceTime);
      return distanceTime + '분 전';
    }
  };

  return (
    <PaperGrid container alignItems="center">
      <Grid item xs={10} onClick={onPostClick}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="body2">{chat.contents}</Typography>
          </Grid>
          <Typography variant="caption">
            {calcTime(chat.registerDate)}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-end"
        justify="flex-end"
        xs={2}
        onClick={onLikeClick}
      >
        {chat.pmLikeId !== 0 ? <LikeFavoriteIcon /> : <FavoriteBorderIcon />}
        <Typography variant="caption">x{chat.likes}</Typography>
      </Grid>
    </PaperGrid>
  );
};

export default PostmapListPaper;
