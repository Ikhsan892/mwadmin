import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  CardHeader,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormGroup
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import client from 'utils/axios';
import useRouter from 'utils/useRouter';
import { logout } from 'actions';

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

const ModalEdit = ({ handleClose, open, user, feature, id }) => {
  const classes = useStyles();
  const [selectedFeatures, setselectedFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nama_role, setNama_role] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectAll = event => {
    const selectedFeatures = event.target.checked
      ? features.map(m => m.id)
      : [];

    setselectedFeatures(selectedFeatures);
  };

  const handleSave = async () => {
    if (nama_role === '' || selectedFeatures.length < 1) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Tidak bisa lanjut sampai semua field terpenuhi',
          severity: 'warning'
        }
      });
    } else {
      setLoading(true);
      await client
        .put(`/api/role/${id}`, {
          nama_role: nama_role,
          menu: selectedFeatures
        })
        .then(data => {
          setLoading(false);
          dispatch({
            type: 'MESSAGE_INFO_OPEN_TRIGGER',
            payload: {
              message: 'Data has been updated',
              severity: 'success'
            }
          });
          alert('Data has been updated');
          dispatch({ type: 'ROLE_TRIGGER' });
          dispatch(logout());
          document.cookie.split(';').forEach(c => {
            document.cookie = c
              .replace(/^ +/, '')
              .replace(
                /=.*/,
                '=;expires=' + new Date().toUTCString() + ';path=/'
              );
          });
          handleClose();
          router.history.push('/auth/login');
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
    setNama_role(user);
    setFeatures(feature);
    fetchFeature();
  }, []);

  useEffect(() => {
    setNama_role(user);
    let _ = [];
    feature.map(i => _.push(i.id));
    setselectedFeatures(_);
  }, [user, feature, id]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        Edit Role
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} justifyContent="space-between">
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={loading}
          onClick={handleSave}>
          {loading ? 'Loading' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
