import { Page } from 'components';
import { makeStyles } from '@material-ui/styles';
import { Header } from './components';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const NewRequests = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="New Requests">
      <Header />
    </Page>
  );
};

export default NewRequests;
