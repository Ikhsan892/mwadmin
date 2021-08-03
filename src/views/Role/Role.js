import React, { useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import { RoleForm } from './components';

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

const Role = () => {
  const classes = useStyles();

  const [role, setRole] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Get Trigger state

  const { role_triggered } = useSelector(state => state.trigger);

  useEffect(() => {
    let mounted = true;

    const fetchRole = () => {
      setLoading(true);
      axios
        .get('/api/role')
        .then(response => {
          if (mounted) {
            setRole(response.data);
            setLoading(false);
          }
        })
        .catch(err => {
          alert('Error while fetching data');
          setLoading(false);
        });
    };

    fetchRole();

    return () => {
      mounted = false;
    };
  }, [role_triggered]);

  const handleFilter = () => {};
  const handleSearch = (event, value) => {
    event.preventDefault();
    if (value !== '') {
      setSearch(
        role.filter(i =>
          i.nama_role.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch([]);
    }
  };

  return (
    <Page className={classes.root} title="Role User">
      <Header title="Role User" form={false} />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
        className={classes.searchBar}
      />
      {/* <RoleForm className={classes.aboutAuthor} /> */}
      {loading ? <LinearProgress /> : <Results role={role} search={search} />}
    </Page>
  );
};

export default Role;
