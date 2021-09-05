import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {},
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const router = useRouter();

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Tambah Data
          </Typography>
          <Typography component="h1" variant="h3">
            {props.title}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
