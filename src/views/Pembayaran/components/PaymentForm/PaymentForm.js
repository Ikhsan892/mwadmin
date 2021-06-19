import { FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';
import React from 'react';

const PaymentForm = ({ ...props }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            error={
              props.touched.name_payment && Boolean(props.errors.name_payment)
            }
            id="name_payment"
            label="Nama Pembayaran"
            onChange={props.handleChange}
            value={props.values.name_payment}
            onBlur={props.handleBlur}
            name="name_payment"
            helperText={props.touched.name_payment && props.errors.name_payment}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {props.onEdit ? (
            ''
          ) : (
            <FormControlLabel
              control={
                <Switch
                  id="aktif"
                  onChange={() =>
                    props.setFieldValue('aktif', !props.values.aktif)
                  }
                  checked={props.values.aktif}
                  name="aktif"
                />
              }
              label="Aktif"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
