import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import client from 'utils/axios';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {},
  mainActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  notice: {
    marginTop: theme.spacing(1)
  },
  deleteButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));
const OtherActions = props => {
  const { className, id, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  /**
   * Handle Delete User
   */
  const handleDelete = () => {
    let delete_data = window.confirm('Yakin mau dihapus ?');
    if (delete_data) {
      setLoading(true);
      client
        .delete(`/api/pelanggan/${id}`)
        .then(data => {
          setLoading(false);
          router.history.push('/management/customers');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Tambahan" />
      <Divider />
      <CardContent>
        <div className={classes.mainActions}>
          <Button>
            <GetAppIcon className={classes.buttonIcon} />
            Export Data Pelanggan
          </Button>
        </div>
        <Button
          className={classes.deleteButton}
          onClick={handleDelete}
          disabled={loading}>
          <DeleteIcon className={classes.buttonIcon} />
          {loading ? 'Loading...' : 'Delete Data Pelanggan'}
        </Button>
      </CardContent>
    </Card>
  );
};

OtherActions.propTypes = {
  className: PropTypes.string
};

export default OtherActions;
