import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: theme.spacing(2)
  }
}));

const Search = props => {
  const { onSearch, className, ...rest } = props;
  const [input, setInput] = React.useState('');
  const classes = useStyles();

  const onSearching = useCallback(
    evt => {
      onSearch(evt, input);
    },
    [input]
  );

  return (
    <form onSubmit={evt => onSearching(evt)}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Paper className={classes.search} elevation={1}>
          <SearchIcon className={classes.searchIcon} />
          <Input
            className={classes.searchInput}
            onChange={evt => setInput(evt.target.value)}
            disableUnderline
            placeholder="Cari Data"
          />
        </Paper>
        <Button
          className={classes.searchButton}
          size="large"
          type="submit"
          variant="contained">
          Cari
        </Button>
      </div>
    </form>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func
};

export default React.memo(Search);
