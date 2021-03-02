import React, { useState, useEffect } from 'react';
import { Grid, TextField, Switch, FormControlLabel } from '@material-ui/core';
import { NegaraField } from 'components';
import AutoComplete from './AutoComplete';
import client from 'utils/axios';

const CustomerForm = ({ ...props }) => {
  const [adaPelanggan, setAdaPelanggan] = useState(false);
  const [customers, setCustomers] = useState([]);

  const handleChange = () => setAdaPelanggan(!adaPelanggan);

  const handleSelected = (event, newEvent) => {
    if (newEvent !== null) {
      // set the input field here
      props.setFieldValue('nama_depan', newEvent.nama_depan);
      props.setFieldValue('nama_belakang', newEvent.nama_belakang);
      props.setFieldValue('email', newEvent.email);
      props.setFieldValue('no_telepon', newEvent.no_telepon);
      props.setFieldValue('negara', newEvent.negara);

      console.log(newEvent);
      return;
    } else {
      return;
    }
  };

  // fetch for autocomplete data
  const customersFetch = async () => {
    let data = await client.get('/api/customers');
    setCustomers(data.data);
  };

  useEffect(() => {
    customersFetch();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControlLabel
            control={
              <Switch
                checked={adaPelanggan}
                onChange={handleChange}
                name="dropdownPelanggan"
                color="primary"
              />
            }
            label="Pilih Pelanggan yang Sudah Ada"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          {adaPelanggan ? (
            <AutoComplete
              label="Pelanggan"
              options={customers}
              onChange={handleSelected}
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            error={props.touched.nama_depan && Boolean(props.errors.nama_depan)}
            id="nama_depan"
            label="Nama Depan"
            onChange={props.handleChange}
            value={props.values.nama_depan}
            onBlur={props.handleBlur}
            name="nama_depan"
            disabled={adaPelanggan}
            helperText={props.touched.nama_depan && props.errors.nama_depan}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="nama_belakang"
            label="Nama Belakang"
            onChange={props.handleChange}
            value={props.values.nama_belakang}
            onBlur={props.handleBlur}
            error={
              props.touched.nama_belakang && Boolean(props.errors.nama_belakang)
            }
            disabled={adaPelanggan}
            helperText={
              props.touched.nama_belakang && props.errors.nama_belakang
            }
            variant="outlined"
            name="nama_belakang"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="email"
            label="Email"
            onChange={props.handleChange}
            value={props.values.email}
            error={props.touched.email && Boolean(props.errors.email)}
            disabled={adaPelanggan}
            onBlur={props.handleBlur}
            helperText={props.touched.email && props.errors.email}
            variant="outlined"
            name="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="no_telepon"
            label="Nomor Telepon"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.no_telepon}
            error={props.touched.no_telepon && Boolean(props.errors.no_telepon)}
            disabled={adaPelanggan}
            helperText={props.touched.no_telepon && props.errors.no_telepon}
            variant="outlined"
            name="no_telepon"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="negara"
            label="Negara"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.negara}
            error={props.touched.negara && Boolean(props.errors.negara)}
            disabled={adaPelanggan}
            helperText={props.touched.negara && props.errors.negara}
            variant="outlined"
            name="negara"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="umur"
            label="Umur"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.umur}
            error={props.touched.umur && Boolean(props.errors.umur)}
            disabled={adaPelanggan}
            helperText={props.touched.umur && props.errors.umur}
            variant="outlined"
            name="umur"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            required
            id="provinsi"
            label="Provinsi"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.provinsi}
            error={props.touched.provinsi && Boolean(props.errors.provinsi)}
            disabled={adaPelanggan}
            helperText={props.touched.provinsi && props.errors.provinsi}
            variant="outlined"
            name="provinsi"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            required
            id="kota_kabupaten"
            label="Kota / Kabupaten"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.kota_kabupaten}
            error={
              props.touched.kota_kabupaten &&
              Boolean(props.errors.kota_kabupaten)
            }
            disabled={adaPelanggan}
            helperText={
              props.touched.kota_kabupaten && props.errors.kota_kabupaten
            }
            variant="outlined"
            name="kota_kabupaten"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            required
            id="kecamatan"
            label="Kecamatan"
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.kecamatan}
            error={props.touched.kecamatan && Boolean(props.errors.kecamatan)}
            disabled={adaPelanggan}
            helperText={props.touched.kecamatan && props.errors.kecamatan}
            variant="outlined"
            name="kecamatan"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="alamat"
            label="Alamat"
            multiline
            rows={5}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            value={props.values.alamat}
            error={props.touched.alamat && Boolean(props.errors.alamat)}
            disabled={adaPelanggan}
            helperText={props.touched.alamat && props.errors.alamat}
            variant="outlined"
            name="alamat"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerForm;
