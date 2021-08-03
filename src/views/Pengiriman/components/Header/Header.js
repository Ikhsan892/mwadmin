import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ModalPengiriman from '../ModalPengiriman';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalPengiriman
        onEdit={false}
        url="http://localhost:3000/api/pengiriman"
        open={open}
        title="Tambah Data Pengiriman"
        handleClose={() => setOpen(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Pengaturan Orderan
          </Typography>
          <Typography component="h1" variant="h3">
            Metode Pengiriman
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}>
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
