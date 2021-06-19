import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const CustomerManagementList = () => {
  const classes = useStyles();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const { pelanggan_inserted } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      setLoading(true);
      axios.get('/api/pelanggan').then(response => {
        if (mounted) {
          setCustomers(response.data);
          setLoading(false);
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, [pelanggan_inserted]);

  const handleFilter = () => {};
  const handleSearch = (event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        customers.filter(
          i =>
            i.nama_depan.toLowerCase().includes(value.toLowerCase()) ||
            i.kota_kabupaten.toLowerCase().includes(value.toLowerCase()) ||
            i.gender.toLowerCase().includes(value.toLowerCase()) ||
            i.no_telepon.toLowerCase().includes(value.toLowerCase()) ||
            i.umur.toLowerCase().includes(value)
        )
      );
    } else {
      setSearch([]);
    }
  };

  return (
    <Page className={classes.root} title="Daftar Manajemen Pelanggan">
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={(evt, value) => handleSearch(evt, value)}
      />
      {loading ? (
        <LinearProgress />
      ) : (
        customers && (
          <Results
            className={classes.results}
            customers={customers}
            search={search}
          />
        )
      )}
    </Page>
  );
};

export default CustomerManagementList;
