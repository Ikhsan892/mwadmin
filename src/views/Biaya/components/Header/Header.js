import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ModalBiaya from '../ModalBiaya';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [url, setUrl] = useState('http://localhost:3000/api/biaya-tambahan');
  const [open, setOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [title, setTitle] = useState('Tambahan Biaya Tambahan');

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalBiaya
        open={open}
        url={url}
        onEdit={onEdit}
        title={title}
        handleClose={() => setOpen(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Pengaturan Orderan
          </Typography>
          <Typography component="h1" variant="h3">
            Biaya Tambahan
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}>
            Tambah Biaya
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
