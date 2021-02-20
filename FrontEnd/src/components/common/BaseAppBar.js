import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAppBar = styled(({ ...other }) => <AppBar {...other} />)`
  & .MuiTypography-h6 {
    flex-grow: 1;
    text-align: center;
  }
`;

const ItemContainer = ({ icon, text, onClick, style }) => {
  return (
    <>
      {icon ? (
        <IconButton color="inherit" onClick={onClick} style={style}>
          {icon}
        </IconButton>
      ) : !icon && text ? (
        <Button color="inherit" onClick={onClick} style={style}>
          <Typography variant="subtitle1">{text}</Typography>
        </Button>
      ) : null}
    </>
  );
};

const BaseAppBar = ({
  text,

  leftIcon,
  leftText,
  leftClick,

  rightIcon,
  rightText,
  rightClick,

  leftExtraIcon,
  leftExtraText,
  leftExtraClick,

  rightExtraIcon,
  rightExtraText,
  rightExtraClick,
}) => {
  const isExtraSize = () =>
    leftExtraIcon || leftExtraText || rightExtraIcon || rightExtraText;
  return (
    <StyledAppBar
      color="inherit"
      elevation={0}
      position="sticky"
      color="primary"
    >
      <Toolbar disableGutters={true}>
        <CenterGrid item xs={2}>
          <ItemContainer icon={leftIcon} text={leftText} onClick={leftClick} />
        </CenterGrid>
        {isExtraSize() ? (
          <CenterGrid item container xs={2} justify="flex-start">
            <ItemContainer
              style={{ padding: '12px 12px 12px 0' }}
              icon={leftExtraIcon}
              text={leftExtraText}
              onClick={leftExtraClick}
            />
          </CenterGrid>
        ) : null}

        <Grid item xs={isExtraSize() ? 4 : 8}>
          <Typography variant="h6" align="center">
            {text}
          </Typography>
        </Grid>

        {isExtraSize() ? (
          <CenterGrid item container xs={2} justify="flex-end">
            <ItemContainer
              style={{ padding: '12px 0 12px 12px' }}
              icon={rightExtraIcon}
              text={rightExtraText}
              onClick={rightExtraClick}
            />
          </CenterGrid>
        ) : null}

        <CenterGrid item xs={2}>
          <ItemContainer
            icon={rightIcon}
            text={rightText}
            onClick={rightClick}
          />
        </CenterGrid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default BaseAppBar;
