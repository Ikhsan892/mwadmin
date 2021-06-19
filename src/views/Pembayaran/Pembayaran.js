import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useSelector } from 'react-redux';

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
  const [search, setSearch] = useState([]);
  // Get Trigger state
  const { payment_inserted } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/payment-method').then(response => {
        if (mounted) {
          setMetode(response.data);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, [payment_inserted]);

  const handleFilter = () => {};
  const handleSearch = (event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        metode.filter(i =>
          i.name_payment.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch([]);
    }
  };

  return (
    <Page className={classes.root} title="Pengaturan Metode Pembayaran">
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={(evt, value) => handleSearch(evt, value)}
      />
      <Results
        className={classes.results}
        metode={metode} //
        search={search}
      />
    </Page>
  );
};

export default Pembayaran;
