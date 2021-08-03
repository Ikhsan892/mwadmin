import React from 'react';
import { Grid } from '@material-ui/core';
import { FilesDropzone } from 'components';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const BarangForm = props => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilesDropzone multiple={true} formik={props} name={`gambar`} />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          style={{ width: '100%' }}
          disabled={false}
          name={`nama_barang`}
          type="text"
          variant="outlined"
          label="Nama Barang"
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          style={{ width: '100%' }}
          disabled={false}
          name={`merk`}
          type="text"
          variant="outlined"
          label="Merk"
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          style={{ width: '100%' }}
          disabled={false}
          placeholder="Samsung J1 2015"
          name={`spesifikasi`}
          type="text"
          variant="outlined"
          label="Spesifikasi"
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          placeholder="Android | IOS | PC | Tablet | Etc"
          style={{ width: '100%' }}
          disabled={false}
          name={`jenis_barang`}
          type="text"
          variant="outlined"
          label="Jenis Barang"
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          multiline
          rows={5}
          placeholder="Keluhan Pelanggan"
          style={{ width: '100%' }}
          disabled={false}
          name={`keluhan`}
          type="text"
          variant="outlined"
          label="Keluhan"
        />
      </Grid>
    </Grid>
  );
};

export default BarangForm;
