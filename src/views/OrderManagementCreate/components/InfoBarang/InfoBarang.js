import { Field } from 'formik';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles(theme => ({
  invoice: {
    marginBottom: theme.spacing(3)
  },
  hiddenRadio: {
    appearance: 'none'
  },
  checkedRadio: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main
  },
  uncheckedRadio: {
    border: `2px solid #ccc`,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const InfoBarang = ({ ...props }) => {
  const classes = useStyles();

  // Generate Invoice Random Number
  const generateRandom = () => {
    let number = Math.floor(Math.random() * 99999) + 10000; // returns a random integer from 1 to 100
    let mergeString = 'MW' + number;
    props.setFieldValue('no_invoice', mergeString);
  };
  return (
    <Grid container spacing={2} className={classes.invoice}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Field
              component={TextField}
              disabled={false}
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
              onClick={() => generateRandom(props)}>
              Generate Invoice
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h5">Tipe Invoice</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <label>
                  <Field
                    type="radio"
                    name="tipe"
                    value="service"
                    className={classes.hiddenRadio}
                  />
                  <Card
                    className={
                      props.values.tipe === 'service'
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
                    name="tipe"
                    value="produk"
                    className={classes.hiddenRadio}
                  />
                  <Card
                    className={
                      props.values.tipe === 'produk'
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
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Field
          component={TextField}
          style={{ width: '100%' }}
          disabled={false}
          shrink
          name="tanggal_invoice"
          type="date"
          variant="outlined"
          label="Tanggal Invoice"
        />
      </Grid>
    </Grid>
  );
};

export default InfoBarang;
