import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, form, ...rest } = props;

  const router = useRouter();

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Role
          </Typography>
          <Typography component="h1" variant="h3">
            {props.title}
          </Typography>
        </Grid>
        {form ? (
          ''
        ) : (
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.history.push('/role/add-role/')}>
              Tambah Role
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
