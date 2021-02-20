import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';

const StyledPaper = styled(Paper)`
  border-radius: 1rem !important;
  padding: 0 1rem;
  & + & {
    margin-top: 1rem;
  }
  &:first-child {
    margin-top: 0.5rem;
  }
  &:last-child {
    margin-bottom: 6rem;
  }
`;

const OnelineTypo = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const InnerGrid = styled(Grid)`
  width: 100%;
`;

const CommunityListPaper = ({ communityInfo, handleClick }) => {
  return (
    <StyledPaper elevation={0} onClick={handleClick}>
      <Grid container direction="column">
        <InnerGrid item style={{ margin: '0.3rem 0' }}>
          <Typography variant="subtitle1">{communityInfo.title}</Typography>
        </InnerGrid>
        <InnerGrid item>
          <OnelineTypo variant="body2">{communityInfo.contents}</OnelineTypo>
        </InnerGrid>
        <InnerGrid item container>
          <Grid item xs={6}>
            <Typography variant="overline">{communityInfo.nickname}</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Typography variant="overline">
              {moment(`${communityInfo.registerDate}`).fromNow()}
            </Typography>
          </Grid>
        </InnerGrid>
      </Grid>
    </StyledPaper>
  );
};

export default CommunityListPaper;
