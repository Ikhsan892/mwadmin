import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const OrderManagementList = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  const handleFetchOrder = async () => {
    let response = await axios.get('/api/invoice/admin');
    setOrders(response.data.resi);
  };

  useEffect(() => {
    handleFetchOrder();
  }, []);

  return (
    <Page className={classes.root} title="Daftar Orderan">
      <Header />
      <SearchBar />
      <Results
        className={classes.results}
        orders={orders} //
      />
    </Page>
  );
};

export default OrderManagementList;
