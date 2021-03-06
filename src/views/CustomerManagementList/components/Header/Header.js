import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ModalAddCustomer from '../ModalAddCustomer';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalAddCustomer
        open={open}
        handleClose={() => setOpen(false)}
        title="Tambah Customer"
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Manajemen
          </Typography>
          <Typography component="h1" variant="h3">
            Pelanggan
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}>
            Tambah Pelanggan
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
