import React, { useEffect, useCallback } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import axios from 'utils/axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  searchBar: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

const Inventory = () => {
  const classes = useStyles();

  const [inventory, setInventory] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Get Trigger state

  const { inventory_triggered } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchInventory = () => {
      setLoading(true);
      axios
        .get('/api/inventory')
        .then(response => {
          if (mounted) {
            setInventory(response.data);
            setLoading(false);
          }
        })
        .catch(err => {
          alert('Error while fetching data');
          setLoading(false);
        });
    };

    fetchInventory();

    return () => {
      mounted = false;
    };
  }, [inventory_triggered]);

  const handleFilter = () => {};
  const handleSearch = useCallback(
    (event, value) => {
      event.preventDefault();
      if (value !== '') {
        setSearch(
          inventory.filter(i =>
            i.nama_barang.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setSearch([]);
      }
    },
    [inventory]
  );

  return (
    <Page className={classes.root} title="Manajemen Inventory">
      <Header title="Inventory Barang" />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
        className={classes.searchBar}
      />
      {loading ? (
        <LinearProgress />
      ) : (
        <Results inventory={inventory} search={search} />
      )}
    </Page>
  );
};

export default React.memo(Inventory);
