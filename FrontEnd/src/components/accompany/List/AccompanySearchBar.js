import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '85%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const AccompanySearchBar = ({ onClick }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const onChange = e => {
    setText(e.target.value);
  };
  const handleSearchClick = e => {
    onClick(text);
  };

  return (
    <>
      <Paper elevation={0} className={classes.root}>
        <InputBase
          className={classes.input}
          value={text}
          onChange={onChange}
          placeholder="검색어를 입력해주세요."
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          onClick={handleSearchClick}
          aria-label="search"
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default AccompanySearchBar;
