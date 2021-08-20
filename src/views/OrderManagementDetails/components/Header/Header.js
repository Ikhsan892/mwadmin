import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, Fab, colors } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ModalFormBarang } from '..';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {},
  toolbar: {
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  deleteButton: {
    color: theme.palette.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900]
    }
  },
  deleteIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { order, className, ...rest } = props;

  const classes = useStyles();
  const [openForm, setOpenForm] = React.useState(false);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalFormBarang
        title="Tambah Barang"
        open={openForm}
        order={order}
        handleClose={() => setOpenForm(false)}
      />
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Orderan
          </Typography>
          <Typography component="h1" variant="h3">
            Order #{order.id}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button className={classes.deleteButton} variant="contained">
                <DeleteIcon className={classes.deleteIcon} />
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={() => setOpenForm(true)}>
                <AddIcon className={classes.deleteIcon} />
                Tambah Barang
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default Header;
