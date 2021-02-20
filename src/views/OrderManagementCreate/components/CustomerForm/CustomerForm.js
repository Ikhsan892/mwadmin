import React, { useState, useEffect } from 'react';
import { Grid, TextField, Switch, FormControlLabel } from '@material-ui/core';
import AutoComplete from './AutoComplete';
import client from 'utils/axios';

const CustomerForm = () => {
  const [adaPelanggan, setAdaPelanggan] = useState(false);
  const [namaDepan, setNamaDepan] = useState('');
  const [namaBelakang, setNamaBelakang] = useState('');
  const [customers, setCustomers] = useState([]);
  const handleChange = () => setAdaPelanggan(!adaPelanggan);

  const handleSelected = (event, newEvent) => {
    if (newEvent !== null) {
      setNamaDepan(newEvent.nama_depan);
      setNamaBelakang(newEvent.nama_belakang);
    } else {
      return;
    }
  };
  const customersFetch = async () => {
    let data = await client.get('/api/customers');
    setCustomers(data.data);
  };
  useEffect(() => {
    customersFetch();
  }, []);
  return (
    <div>
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
            <AutoComplete options={customers} handleSelected={handleSelected} />
          ) : (
            ''
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="nama-depan"
            label="Nama Depan"
            value={namaDepan}
            disabled={adaPelanggan}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            required
            id="nama-belakang"
            label="Nama Belakang"
            value={namaBelakang}
            disabled={adaPelanggan}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerForm;
