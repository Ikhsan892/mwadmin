import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { Page } from 'components';
import { Header, OrderInfo, OrderItems, OrderAddons } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const OrderManagementDetails = props => {
  const { match, history } = props;
  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    let mounted = true;

    const fetchOrder = () => {
      axios.get(`/api/order/${id}`).then(response => {
        if (mounted) {
          setOrder(response.data);
        }
      });
    };

    fetchOrder();

    return () => {
      mounted = false;
    };
  }, []);

  if (!order) {
    return <div>Kosong brodi</div>;
  }

  return (
    <Page className={classes.root} title="Detail Orderan">
      <Header order={order} />
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={4} xl={3} xs={12}>
          <OrderInfo order={order} />
        </Grid>
        {/* <Grid item md={8} xl={9} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrderItems order={order} />
            </Grid>
            <Grid item xs={12}>
              <OrderAddons order={order} />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Page>
  );
};

export default OrderManagementDetails;
