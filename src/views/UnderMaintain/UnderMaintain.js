import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';

import { Page } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UnderMaintain = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page className={classes.root} title="Sedang Maintenance">
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        Maaf halaman ini sedang dimaintenance
      </Typography>
      <Typography align="center" variant="subtitle2">
        Kamu harus pindah ke halaman yang diperbolehkan, yaitu orderan dan
        pelanggan di bagian manajemen
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under Maintenance"
          className={classes.image}
          src="/images/maintenance.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          to="/management/orders"
          variant="outlined">
          Kembali ke Management Orderan
        </Button>
      </div>
    </Page>
  );
};

export default UnderMaintain;
