import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';

const BiayaForm = ({ ...props }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            error={props.touched.nama_biaya && Boolean(props.errors.nama_biaya)}
            id="nama_biaya"
            label="Nama Biaya"
            onChange={props.handleChange}
            value={props.values.nama_biaya}
            onBlur={props.handleBlur}
            name="nama_biaya"
            helperText={props.touched.nama_biaya && props.errors.nama_biaya}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="number"
            error={
              props.touched.biaya_ditaksir &&
              Boolean(props.errors.biaya_ditaksir)
            }
            id="biaya_ditaksir"
            label="Biaya Ditaksir"
            onChange={props.handleChange}
            value={props.values.biaya_ditaksir}
            onBlur={props.handleBlur}
            name="biaya_ditaksir"
            helperText={
              props.touched.biaya_ditaksir && props.errors.biaya_ditaksir
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                id="is_utama"
                onChange={() =>
                  props.setFieldValue('is_utama', !props.values.is_utama)
                }
                checked={props.values.is_utama}
                name="is_utama"
              />
            }
            label="Aktif"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BiayaForm;
