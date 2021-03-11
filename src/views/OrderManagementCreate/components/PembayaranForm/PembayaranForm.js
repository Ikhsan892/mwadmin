import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import client from 'utils/axios';
import { FieldArray, Field } from 'formik';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Select } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: '0px'
  },
  cardcontent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  radio: {
    padding: 0
  },
  logo: {
    width: 'auto',
    height: 30
  }
}));

const PembayaranForm = props => {
  const classes = useStyles();
  const [metode, setMetode] = useState([]);
  const [statusPembayaran, setStatusPembayaran] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultProps = {
    m: 1,
    border: 1,
    style: {
      width: 'auto',
      height: 'auto',
      padding: '20px',
      borderRadius: '5px'
    }
  };

  // Get Payment Method
  const getPembayaranData = async () => {
    let data = await client.get('/api/metode-pembayaran');
    setMetode(data.data);
  };

  // Get Keterangan Pembayaran
  const getPaymentStatus = async () => {
    let data = await client.get('/api/status-pembayaran');
    setStatusPembayaran(data.data);
  };

  // Generate Invoice Random Number
  const generateRandom = () => {
    let number = Math.floor(Math.random() * 99999) + 10000; // returns a random integer from 1 to 100
    let mergeString = 'MW' + number;
    props.setFieldValue('no_invoice', mergeString);
  };

  useEffect(() => {
    setLoading(true);
    getPembayaranData();
    getPaymentStatus();
    setLoading(false);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Nomor Invoice</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Field
                component={TextField}
                variant="outlined"
                style={{ width: '100%' }}
                label="Nomor Invoice"
                name="no_invoice"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button
                type="button"
                color="primary"
                variant="outlined"
                onClick={generateRandom}>
                Generate Number
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Metode Pembayaran</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Grid container row spacing={2}>
            {loading
              ? [1, 2, 3, 4].map(j => (
                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <Skeleton height={120} style={{ width: '100%' }} />
                  </Grid>
                ))
              : metode.map(i => (
                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <Card variant="outlined">
                      <CardContent className={classes.cardcontent}>
                        <Field
                          type="radio"
                          id="metode_pembayaran"
                          value={i.nama_metode_pembayaran}
                          name="metode_pembayaran"
                        />
                        <img src={i.logo_metode} className={classes.logo} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Keterangan Pembayaran</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {loading ? (
            <Skeleton height={35} style={{ width: '100%' }} />
          ) : (
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel htmlFor="status_pembayaran">
                Status Pembayaran
              </InputLabel>
              <Field
                component={Select}
                name="age"
                inputProps={{
                  id: 'status_pembayaran'
                }}>
                {statusPembayaran.map(i => (
                  <MenuItem value={i.id}>{i.nama_status_pembayaran}</MenuItem>
                ))}
              </Field>
            </FormControl>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PembayaranForm;
