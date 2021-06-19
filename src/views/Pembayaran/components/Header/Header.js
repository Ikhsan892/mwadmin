import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ModalAddPayment from '../ModalAddPayment';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [openForm, setOpenForm] = React.useState(false);

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalAddPayment
        title="Tambah Metode Pembayaran"
        open={openForm}
        handleClose={() => setOpenForm(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Pengaturan Orderan
          </Typography>
          <Typography component="h1" variant="h3">
            Metode Pembayaran
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenForm(true)}>
            Tambah Metode
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
