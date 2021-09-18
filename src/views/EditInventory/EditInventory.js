import { Page, LinearProgressWithLabel } from 'components';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  LinearProgress,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Header } from './components';
import axios from 'utils/axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInventory from './components/FormInventory/FormInventory';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  form: {
    marginTop: 30
  },
  image: {
    maxHeight: 350,
    objectFit: 'contain',
    margin: '0 auto'
  },
  box: {
    width: 100,
    position: 'relative',
    height: 100
  },
  detail_img: {
    width: 100,
    height: 100,
    borderRadius: '8%',
    objectFit: 'cover'
  },
  deleteBtn: {
    position: 'absolute',
    background: 'none',
    top: 0,
    right: 0
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

const EditInventory = props => {
  const classes = useStyles();
  const { match } = props;
  const { namabarang, tipebarang } = match.params;
  const formikRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFound, setIsFound] = useState(false);
  const [images, setImages] = React.useState([]);

  /**
   * Hide Images on click
   */
  const hideImages = id => {
    setImages(
      images.map(image => {
        if (image.id !== id) {
          return image;
        }

        return {
          ...image,
          hidden: true
        };
      })
    );
  };

  useEffect(() => {
    const fetchDetailBarang = async () => {
      setLoading(true);
      await axios
        .get(`/api/inventory/${namabarang}/${tipebarang}`)
        .then(response => {
          setLoading(false);
          if (response.status === 201) {
            setIsFound(false);
          } else {
            setIsFound(true);
            setImages(
              response.data.data.image.map(i => {
                return {
                  ...i,
                  hidden: false
                };
              })
            );
            formikRef.current.setFieldValue(
              'nama_barang',
              response.data.data.nama_barang
            );
            formikRef.current.setFieldValue(
              'merk_barang',
              response.data.data.merk_barang
            );
            formikRef.current.setFieldValue(
              'tipe_barang',
              response.data.data.tipe_barang
            );
            if (response.data.data.tipe_barang === 'sparepart') {
              formikRef.current.setFieldValue(
                'spesifikasi_barang',
                response.data.data.spesifikasi_barang
              );
            }
            formikRef.current.setFieldValue(
              'disabled',
              response.data.data.disabled
            );
            formikRef.current.setFieldValue('stok', response.data.data.stok);
            formikRef.current.setFieldValue(
              'harga_beli',
              response.data.data.harga_beli
            );
            formikRef.current.setFieldValue(
              'harga_jual',
              response.data.data.harga_jual
            );
            formikRef.current.setFieldValue(
              'deskripsi',
              response.data.data.deskripsi
            );
          }
        })
        .catch(err => {
          setLoading(false);
          setIsFound(false);
          console.log(err);
        });
    };
    fetchDetailBarang();
  }, [namabarang, tipebarang]);

  return (
    <Page className={classes.root} title="Edit Inventory Barang">
      <Header title="Edit Inventory Barang" />
      {isFound ? (
        <Grid container spacing={2} className={classes.form}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Edit Data" />
              <CardContent>
                {progress > 0 ? (
                  <LinearProgressWithLabel value={progress} />
                ) : null}
                <Grid container spacing={2}>
                  {images &&
                    images.map(i =>
                      i.hidden === false ? (
                        <Grid item>
                          <div className={classes.box}>
                            <Fab
                              size="small"
                              color="secondary"
                              aria-label="add"
                              onClick={() => hideImages(i.id)}
                              className={classes.deleteBtn}>
                              <ClearIcon />
                            </Fab>
                            <img
                              src={`${process.env.REACT_APP_SERVER_URL}/${i.image_path}`}
                              alt={i.image_path}
                              className={classes.detail_img}
                            />
                          </div>
                        </Grid>
                      ) : null
                    )}
                </Grid>
                <Formik
                  innerRef={formikRef}
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
                  onSubmit={values => console.log(values)}
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
      ) : loading && !isFound ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          <Grid item>
            <img
              src="/images/undraw_no_data_qbuo.svg"
              alt="No Image"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">Gak Ketemu</Typography>
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

export default EditInventory;
