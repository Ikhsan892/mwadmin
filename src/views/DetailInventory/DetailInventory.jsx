import React, { useEffect, useState } from 'react';
import { Page } from 'components';
import axios from 'utils/axios';
import { Header, Content } from './components';
import { makeStyles } from '@material-ui/styles';

import { LinearProgress, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  image: {
    maxHeight: 350,
    objectFit: 'contain',
    margin: '0 auto'
  }
}));

const DetailInventory = props => {
  const { match } = props;
  const { namabarang, tipebarang } = match.params;
  const classes = useStyles();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    const fetchDetailBarang = async () => {
      setLoading(true);
      await axios
        .get(`/api/inventory/${namabarang}/${tipebarang}`)
        .then(response => {
          setLoading(false);
          if (response.status === 201) {
            setIsFound(false);
          } else {
            setIsFound(true);
            setDetail(response.data);
          }
        })
        .catch(err => {
          setLoading(false);
          setIsFound(false);
          console.log(err);
        });
    };
    fetchDetailBarang();
  }, [namabarang, tipebarang, setDetail]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Page className={classes.root} title="Detail">
      <Header title="" />
      {isFound ? (
        <Content detail={detail} />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          <Grid item>
            <img
              src="/images/undraw_no_data_qbuo.svg"
              alt="No Image"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">Gak Ketemu</Typography>
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

export default DetailInventory;
