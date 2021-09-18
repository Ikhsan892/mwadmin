import { LinearProgressWithLabel, Page } from 'components';
import { Header } from './components';
import { Card, CardContent, CardHeader, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import client from 'utils/axios';
import useRouter from 'utils/useRouter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInventory from './components/FormInventory/FormInventory';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  form: {
    marginTop: 30
  }
}));
const InventorySchema = Yup.object().shape({
  gambar: Yup.array(),
  nama_barang: Yup.string()
    .min(2, 'Kependekan!')
    .max(50, 'Kepanjangan!')
    .required('Required'),
  merk_barang: Yup.string()
    .min(2, 'Kependekan!')
    .required('Required'),
  tipe_barang: Yup.string()
    .min(2, 'Kependekan!')
    .max(50, 'Kepanjangan!')
    .required('Required'),
  disabled: Yup.boolean(),
  spesifikasi_barang: Yup.string()
    .max(50, 'Kepanjangan!')
    .required('Required'),
  stok: Yup.number().required('Required'),
  harga_beli: Yup.string()
    .min(3, 'Minimal 3 digit!')
    .required('Required'),
  harga_jual: Yup.string()
    .min(3, 'Minimal 3 digit!')
    .required('Required'),
  deskripsi: Yup.string().min(3, 'Kependekan!')
});
const TambahInventory = () => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = useCallback(values => {
    if (values.harga_jual < values.harga_beli) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Harga Jual tidak boleh kurang dari harga beli',
          severity: 'warning'
        }
      });
    } else {
      setLoading(true);
      let formData = new FormData();
      for (var key in values) {
        if (key === 'gambar') {
          Array.from(values.gambar).map(i => formData.append('file', i));
        } else {
          formData.append(`${key}`, values[key]);
        }
      }
      client
        .post('/api/inventory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: ev => {
            const progress = Math.round((ev.loaded / ev.total) * 100);
            setProgress(progress);
          }
        })
        .then(response => {
          setLoading(false);
          setProgress(0);
          dispatch({
            type: 'MESSAGE_INFO_OPEN_TRIGGER',
            payload: {
              message: 'Success Tambah Barang',
              severity: 'success'
            }
          });
          router.history.push('/inventory/list');
        })
        .catch(err => {
          setLoading(false);
          setProgress(0);
          alert(err.response?.data.message);
        });
    }
  }, []);

  return (
    <Page className={classes.root} title="Tambah Inventory Barang">
      <Header title="Tambah Inventory Barang" />
      <Grid container spacing={2} className={classes.form}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Isi Data" />
            <CardContent>
              {progress > 0 ? (
                <LinearProgressWithLabel value={progress} />
              ) : null}
              <Formik
                initialValues={{
                  gambar: [],
                  nama_barang: '',
                  merk_barang: '',
                  tipe_barang: 'accessories',
                  disabled: false,
                  spesifikasi_barang: '-',
                  stok: 0,
                  harga_beli: 0,
                  harga_jual: 0,
                  deskripsi: ''
                }}
                validationSchema={InventorySchema}
                onSubmit={values => handleSubmit(values)}
                noValidate>
                {props => (
                  <FormInventory props={props}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}>
                      <SaveIcon style={{ paddingRight: 7 }} />
                      {loading ? `Uploading ${progress}` : 'Simpan Data'}
                    </Button>
                  </FormInventory>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default TambahInventory;
