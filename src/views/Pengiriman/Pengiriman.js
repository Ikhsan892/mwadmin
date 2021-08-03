import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
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
  const [search, setSearch] = useState([]);

  // Get Trigger state
  const { pengiriman_triggered } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/pengiriman').then(response => {
        if (mounted) {
          setPengiriman(response.data);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, [pengiriman_triggered]);

  const handleFilter = () => {};
  const handleSearch = (event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        pengiriman.filter(i =>
          i.nama_pengiriman.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch([]);
    }
  };

  return (
    <Page className={classes.root} title="Pengaturan Metode Pengiriman">
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={(evt, value) => handleSearch(evt, value)}
      />
      <Results
        className={classes.results}
        pengiriman={pengiriman} //
        search={search}
      />
    </Page>
  );
};

export default Pengiriman;
