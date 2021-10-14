import {
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  Typography
} from '@material-ui/core';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import { makeStyles } from '@material-ui/styles';
import client from 'utils/axios';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import AutoComplete from 'views/OrderManagementCreate/components/CustomerForm/AutoComplete';

/**
 * Schema formik
 */
const InfoSchema = Yup.object().shape({
  tipe_invoice: Yup.string().required('required'),
  status_invoice: Yup.string().required('required')
});

const useStyles = makeStyles(theme => ({
  hiddenRadio: {
    appearance: 'none'
  },
  checkedRadio: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main
  },
  uncheckedRadio: {
    border: `2px solid #ccc`,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const ModalEditInfo = ({ open, handleClose }) => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [payment, setPayment] = useState([]);
  const formikRef = useRef();

  const customersFetch = useCallback(async () => {
    let response = await client.get('/api/pelanggan');
    setCustomers(response.data);
  }, []);

  const tipePembayaranFetch = useCallback(async () => {
    let response = await client.get('/api/payment-method');
    setPayment(response.data);
  }, []);

  const handleSelected = useCallback(
    (event, newEvent) => {
      if (newEvent !== null) {
        // set the input field here
        formikRef.current.setFieldValue('pelanggan_id', newEvent.id);
        return;
      } else {
        return;
      }
    },
    [formikRef]
  );

  useEffect(() => {
    customersFetch();
    tipePembayaranFetch();
  }, [customersFetch, tipePembayaranFetch]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        id: 0,
        pelanggan_id: 0,
        tipe_invoice: 'produk',
        status_invoice: '',
        metode_pembayaran: 0,
        metode_pengiriman: 0
      }}
      validationSchema={InfoSchema}
      onSubmit={console.log}
      noValidate>
      {props => (
        <>
          <Form onSubmit={props.handleSubmit} noValidate>
            <Dialog
              fullWidth={true}
              maxWidth="sm"
              disableBackdropClick={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title">
              <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
                Edit Info Order
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <AutoComplete
                      label="Pelanggan"
                      options={customers}
                      onChange={handleSelected}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline" gutterBottom>
                      Current Customer
                    </Typography>
                    <Typography>Fatihul Ikhsan</Typography>
                    <Typography>Motherfucker</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="h5">Tipe Invoice</Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <label>
                          <Field
                            type="radio"
                            name="tipe_invoice"
                            value="service"
                            className={classes.hiddenRadio}
                          />
                          <Card
                            className={
                              props.values.tipe_invoice === 'service'
                                ? classes.checkedRadio
                                : classes.uncheckedRadio
                            }>
                            <CardContent>
                              <Typography variant="h6">Service</Typography>
                            </CardContent>
                          </Card>
                        </label>
                      </Grid>
                      <Grid item>
                        <label>
                          <Field
                            type="radio"
                            name="tipe_invoice"
                            value="produk"
                            className={classes.hiddenRadio}
                          />
                          <Card
                            className={
                              props.values.tipe_invoice === 'produk'
                                ? classes.checkedRadio
                                : classes.uncheckedRadio
                            }>
                            <CardContent>
                              <Typography variant="h6">Produk</Typography>
                            </CardContent>
                          </Card>
                        </label>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ModalEditInfo;
