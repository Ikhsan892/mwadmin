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

const Biaya = () => {
  const classes = useStyles();
  const [biaya, setBiaya] = useState([]);
  const [search, setSearch] = useState([]);

  // Get Trigger state
  const { biaya_triggered } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/biaya-tambahan').then(response => {
        if (mounted) {
          setBiaya(response.data);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, [biaya_triggered]);

  const handleFilter = () => {};
  const handleSearch = (event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        biaya.filter(i =>
          i.nama_biaya.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch([]);
    }
  };

  return (
    <Page className={classes.root} title="Pengaturan Biaya Tambahan">
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={(evt, value) => handleSearch(evt, value)}
      />
      <Results className={classes.results} biaya={biaya} search={search} />
    </Page>
  );
};

export default Biaya;
