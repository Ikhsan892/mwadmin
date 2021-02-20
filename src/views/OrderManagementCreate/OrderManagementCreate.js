import React from 'react';
import { Page } from 'components';
import { FormStepper } from './components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));
const OrderManagementCreate = () => {
  const classes = useStyles();
  return (
    <>
      <Page className={classes.root} title="Tambah Orderan">
        <FormStepper className={classes.results} />
      </Page>
    </>
  );
};

export default OrderManagementCreate;
