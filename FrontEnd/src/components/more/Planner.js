import React, { useState } from 'react';
import PlanTravel from './PlanTravel';
import PlanDaily from './PlanDaily';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Menu, MenuItem, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Planner = () => {
  const classes = useStyles();
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTitle, setMenuTitle] = useState('여행 일정');

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [schedule, setSchedule] = useState('travel');

  const handleChangeSchedule = (value, title) => {
    setSchedule(value);
    setMenuTitle(title);
    handleMenuClose();
  };

  let planPage = '';

  if (schedule === 'travel') {
    planPage = <PlanTravel />;
  } else if (schedule === 'daily') {
    planPage = <PlanDaily />;
  }
  return (
    <>
      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        style={{ margin: '0px' }}
        wrap="nowrap"
      >
        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1em',
          }}
        >
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            style={{ backgroundColor: 'white' }}
          >
            {menuTitle} <ArrowDropDownIcon style={{ color: 'black' }} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => handleChangeSchedule('travel', '여행 일정')}
            >
              여행 일정
            </MenuItem>
            <MenuItem
              onClick={() => handleChangeSchedule('daily', '동행자 목록')}
            >
              동행자 목록
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item>{planPage}</Grid>
      </Grid>
    </>
  );
};

export default Planner;
