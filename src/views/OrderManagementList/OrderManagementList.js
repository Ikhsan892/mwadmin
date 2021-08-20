import React, { useEffect, useState, useCallback } from 'react';
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
  const [search, setSearch] = useState([]);

  const handleFetchOrder = useCallback(async () => {
    let response = await axios.get('/api/order');
    setOrders(response.data);
  }, []);

  useEffect(() => {
    handleFetchOrder();
  }, [handleFetchOrder]);

  const handleSearch = useCallback((event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        orders.filter(
          i =>
            i.pelanggan.nama_depan
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            i.pelanggan.nama_belakang
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            i.status.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch([]);
    }
  });

  return (
    <Page className={classes.root} title="Daftar Orderan">
      <Header />
      <SearchBar onSearch={(evt, value) => handleSearch(evt, value)} />
      <Results
        className={classes.results}
        orders={orders} //
        search={search}
      />
    </Page>
  );
};

export default OrderManagementList;
