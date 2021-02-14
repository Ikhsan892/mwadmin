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

const Pembayaran = () => {
  const classes = useStyles();
  const [metode, setMetode] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/pengaturan/pembayaran').then(response => {
        if (mounted) {
          setMetode(response.data.metode);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Pengaturan Metode Pembayaran">
      <Header />
      <SearchBar minimal={true} />
      <Results
        className={classes.results}
        metode={metode} //
      />
    </Page>
  );
};

export default Pembayaran;
