import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from '../../../api/moment';

const DivStyled = styled.div`
  flex-grow: 1;
  & + & {
    margin-top: 1rem;
  }
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MultiLineTypography = styled(({ ...other }) => <Typography {...other} />)`
  min-height: 2.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const AccompanyListPaper = ({ boardInfo, onClick }) => {
  return (
    <DivStyled onClick={onClick}>
      <Paper elevation={0} style={{ borderRadius: '1rem' }}>
        <Grid container direction="column">
          <Grid item container>
            <CenterGrid item xs={2}>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                style={{ fontWeight: '800' }}
              >
                {boardInfo.type}
              </Typography>
            </CenterGrid>
            <Grid item xs={10}>
              <MultiLineTypography variant="subtitle2">
                {boardInfo.title}
              </MultiLineTypography>
            </Grid>
          </Grid>

          <Grid item container style={{ paddingBottom: '0.5rem' }}>
            <Grid item xs={5}>
              <Typography
                variant="body2"
                align="left"
                style={{ padding: '0 1rem' }}
              >
                {boardInfo.nickname}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography
                variant="body2"
                align="left"
                style={{ paddingRight: '1rem' }}
              >
                {moment.convertDate(boardInfo.startDate)}~
                {moment.convertDate(boardInfo.endDate)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </DivStyled>
  );
};

export default AccompanyListPaper;
