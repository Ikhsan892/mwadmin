import React, { useState, useEffect } from 'react';
import { Page } from 'components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormGroup
} from '@material-ui/core';
import client from 'utils/axios';
import Header from '../Header';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  formControl: {
    margin: theme.spacing(2)
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const RoleForm = props => {
  const { className, ...rest } = props;

  const router = useRouter();
  const classes = useStyles();
  const [selectedFeatures, setselectedFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nama_role, setNama_role] = useState('');

  const handleSelectAll = event => {
    const selectedFeatures = event.target.checked
      ? features.map(m => m.id)
      : [];

    setselectedFeatures(selectedFeatures);
  };

  const handleSave = async () => {
    if (nama_role === '' || selectedFeatures.length < 1) {
      alert('Tidak bisa lanjut sampai semua field terpenuhi');
    } else {
      setLoading(true);
      await client
        .post('/api/role', { nama_role: nama_role, menu: selectedFeatures })
        .then(data => {
          setLoading(false);
          alert('Data has been saved');
          router.history.push('/role');
        })
        .catch(err => {
          setLoading(false);
          alert('error insert data');
          console.log(err);
        });
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFeatures.indexOf(id);
    let newselectedFeatures = [];

    if (selectedIndex === -1) {
      newselectedFeatures = newselectedFeatures.concat(selectedFeatures, id);
    } else if (selectedIndex === 0) {
      newselectedFeatures = newselectedFeatures.concat(
        selectedFeatures.slice(1)
      );
    } else if (selectedIndex === selectedFeatures.length - 1) {
      newselectedFeatures = newselectedFeatures.concat(
        selectedFeatures.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newselectedFeatures = newselectedFeatures.concat(
        selectedFeatures.slice(0, selectedIndex),
        selectedFeatures.slice(selectedIndex + 1)
      );
    }

    setselectedFeatures(newselectedFeatures);
  };

  useEffect(() => {
    const fetchFeature = async () => {
      await client
        .get('/api/menu')
        .then(response => {
          setFeatures(response.data);
        })
        .catch(err => {
          console.log(err);
          alert('Error fetch data');
        });
    };
    fetchFeature();
  }, []);

  return (
    <Page className={classes.root} title="Add Role">
      <Header title="Add Role" className={classes.margin} form={true} />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Untuk Membuat Hak Akses User di Aplikasi" />
        <CardContent>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSave}
                disabled={loading}>
                {loading ? 'Loading' : 'Simpan'}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={nama_role === ''}
                    id="name_payment"
                    label="Nama Role"
                    onChange={e => setNama_role(e.target.value)}
                    value={nama_role}
                    name="nama_role"
                    helperText="Tidak Boleh Kosong"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <CardHeader
                    title="List Menu"
                    action={
                      <FormControl
                        required
                        error={selectedFeatures.length < 1}
                        component="fieldset"
                        className={classes.formControl}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                selectedFeatures.length === features.length
                              }
                              color="primary"
                              indeterminate={
                                selectedFeatures.length > 0 &&
                                selectedFeatures.length < features.length
                              }
                              onChange={handleSelectAll}
                            />
                          }
                          label="Pilih Semua"
                        />
                        {selectedFeatures.length < 1 ? (
                          <FormHelperText>Minimal Pilih Satu</FormHelperText>
                        ) : (
                          ''
                        )}
                      </FormControl>
                    }
                  />
                  <FormControl className={classes.formControl}>
                    {features &&
                      features.map(j => (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedFeatures.indexOf(j.id) !== -1}
                                color="primary"
                                onChange={event => handleSelectOne(event, j.id)}
                                value={selectedFeatures.indexOf(j.id) !== -1}
                              />
                            }
                            label={j.nama_menu}
                          />
                        </FormGroup>
                      ))}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
};

RoleForm.propTypes = {
  className: PropTypes.string
};

export default RoleForm;
