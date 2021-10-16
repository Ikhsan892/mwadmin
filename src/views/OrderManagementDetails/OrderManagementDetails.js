import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress, Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { Page } from 'components';
import {
  Header,
  OrderInfo,
  OrderItems,
  OrderAddons,
  OrderPriceAddons,
  OrderDiskonPengurangan
} from './components';
import { useSelector } from 'react-redux';

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
  const { barang_triggered } = useSelector(state => state.trigger);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = match.params;

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      let response = await axios.get(`/api/order/${id}`);
      setOrder(response.data);
      setLoading(false);
    };

    fetchOrder();
  }, [barang_triggered]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100vh',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Page className={classes.root} title="Detail Orderan">
      <Header order={order} />
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={4} xl={3} xs={12}>
          <OrderInfo order={order} />
        </Grid>
        <Grid item md={8} xl={9} xs={12}>
          <Grid container spacing={3}>
            {order.tipe === 'service' ? (
              <Grid item xs={12}>
                <OrderItems barang={order.barang} order={order} />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <OrderAddons order={order} />
            </Grid>
            <Grid item xs={12}>
              <OrderPriceAddons order={order} />
            </Grid>
            <Grid item xs={12}>
              <OrderDiskonPengurangan order={order} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default OrderManagementDetails;
