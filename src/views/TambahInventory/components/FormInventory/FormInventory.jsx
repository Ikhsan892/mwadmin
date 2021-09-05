import React, { useMemo } from 'react';
import {
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Switch
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { FilesDropzone } from 'components';
import { TextField, Select } from 'formik-material-ui';
import { Form, Field } from 'formik';

const FormInventory = ({ props, children }) => {
  const handleSpeck = useMemo(() => {
    if (props.values.tipe_barang === 'sparepart') {
      return (
        <Grid item xs={12}>
          <Field
            component={TextField}
            disabled={false}
            variant="outlined"
            style={{ width: '100%' }}
            label="Spesifikasi Barang"
            placeholder="Android | IOS | Linux | Windows"
            name="spesifikasi_barang"
          />
        </Grid>
      );
    } else {
      props.setFieldValue('spesifikasi_barang', '-');
    }
  }, [props.values.tipe_barang]);

  return (
    <Form onSubmit={props.handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FilesDropzone multiple={true} formik={props} name={`gambar`} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                disabled={false}
                variant="outlined"
                style={{ width: '100%' }}
                label="Nama Barang"
                name="nama_barang"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                disabled={false}
                variant="outlined"
                style={{ width: '100%' }}
                label="Merk Barang"
                name="merk_barang"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                style={{ width: '100%' }}
                disabled={false}>
                <InputLabel htmlFor="age-simple">Tipe Barang</InputLabel>
                <Field
                  component={Select}
                  name="tipe_barang"
                  disabled={false}
                  inputProps={{
                    id: 'age-simple'
                  }}>
                  <MenuItem value="sparepart">Sparepart</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="produk">Produk</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            {handleSpeck}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    type="number"
                    disabled={false}
                    variant="outlined"
                    min={0}
                    style={{ width: '100%' }}
                    label="Stok"
                    name="stok"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.values.disabled}
                        onChange={props.handleChange}
                        name="disabled"
                        color="primary"
                      />
                    }
                    label="Sembunyikan Produk"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                component={TextField}
                type="number"
                disabled={false}
                variant="outlined"
                min={0}
                style={{ width: '100%' }}
                label="Harga Beli"
                name="harga_beli"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                component={TextField}
                type="number"
                disabled={false}
                variant="outlined"
                min={0}
                style={{ width: '100%' }}
                label="Harga Jual"
                name="harga_jual"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            component={TextField}
            disabled={false}
            multiline
            rows={6}
            variant="outlined"
            style={{ width: '100%' }}
            label="Deskripsi"
            name="deskripsi"
          />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Form>
  );
};

export default FormInventory;
