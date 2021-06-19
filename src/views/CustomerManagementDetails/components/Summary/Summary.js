import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, LinearProgress } from '@material-ui/core';

import axios from 'utils/axios';
import { CustomerInfo, Invoices, SendEmails, OtherActions } from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Summary = props => {
  const { className, setName, id, ...rest } = props;

  const classes = useStyles();
  const [customer, setCustomer] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchCustomer = () => {
      setLoading(true);
      axios.get(`/api/pelanggan/${id}`).then(response => {
        if (mounted) {
          setLoading(false);
          setCustomer(response.data);
          setName(
            `${response.data.nama_depan}  ${response.data.nama_belakang}`
          );
        }
      });
    };

    fetchCustomer();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!customer) {
    return null;
  }

  if (!loading) {
    return (
      <Grid
        {...rest}
        className={clsx(classes.root, className)}
        container
        spacing={3}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <CustomerInfo customer={customer} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <Invoices customer={customer} /> */}
        </Grid>
        <SendEmails customer={customer} />
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <OtherActions id={id} />
        </Grid>
      </Grid>
    );
  } else {
    return <LinearProgress />;
  }
};

Summary.propTypes = {
  className: PropTypes.string
};

export default Summary;
