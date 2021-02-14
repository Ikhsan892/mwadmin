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

const Biaya = () => {
  const classes = useStyles();
  const [biaya, setBiaya] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/pengaturan/biaya').then(response => {
        if (mounted) {
          setBiaya(response.data.biaya);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Pengaturan Biaya Tambahan">
      <Header />
      <SearchBar minimal={true} />
      <Results
        className={classes.results}
        biaya={biaya} //
      />
    </Page>
  );
};

export default Biaya;
