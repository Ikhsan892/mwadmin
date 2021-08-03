import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';
import { FilesDropzone } from 'components';

const PengirimanForm = ({ ...props }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilesDropzone formik={props} name="attachment" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={
              props.touched.nama_pengiriman &&
              Boolean(props.errors.nama_pengiriman)
            }
            id="nama_pengiriman"
            label="Nama Pengiriman"
            onChange={props.handleChange}
            value={props.values.nama_pengiriman}
            onBlur={props.handleBlur}
            name="nama_pengiriman"
            helperText={
              props.touched.nama_pengiriman && props.errors.nama_pengiriman
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default PengirimanForm;
