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

const Pengiriman = () => {
  const classes = useStyles();
  const [pengiriman, setPengiriman] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/pengaturan/pengiriman').then(response => {
        if (mounted) {
          setPengiriman(response.data.pengiriman);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Pengaturan Metode Pengiriman">
      <Header />
      <SearchBar minimal={true} />
      <Results
        className={classes.results}
        pengiriman={pengiriman} //
      />
    </Page>
  );
};

export default Pengiriman;
