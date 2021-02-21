import React, { useState, useEffect } from 'react';
import { Grid, TextField, Switch, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from './AutoComplete';
import client from 'utils/axios';

const CustomerForm = ({ ...props }) => {
  const [adaPelanggan, setAdaPelanggan] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [countries, setCountries] = useState([]);

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

    //only country fetch ,
    (async () => {
      const response = await fetch(
        'https://country.register.gov.uk/records.json?page-size=5000'
      );
      const countries = await response.json();
      setCountries(Object.keys(countries).map(key => countries[key].item[0]));
    })();
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
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            id="negara"
            name="negara"
            value={props.values.negara}
            inputValue={props.values.negara}
            onInputChange={(event, newInputValue) => {
              props.setFieldValue('negara', newInputValue);
            }}
            onBlur={props.handleBlur}
            error={props.touched.negara && Boolean(props.errors.negara)}
            helperText={props.touched.negara && props.errors.no_telepon}
            value={props.values.negara}
            onChange={(e, value) => props.setFieldValue('negara', value)}
            id="controllable-states-demo"
            options={countries}
            style={{ width: '100%' }}
            renderInput={params => (
              <TextField {...params} label="Negara" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerForm;
