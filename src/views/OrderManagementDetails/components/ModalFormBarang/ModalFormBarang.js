import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import { LinearProgressWithLabel } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import request from 'utils/axios';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import BarangForm from '../BarangForm';

const useStyles = makeStyles(theme => ({
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

const ModalFormBarang = ({
  open,
  order,
  id,
  getDetail,
  handleClose,
  title,
  action = 'add'
}) => {
  /**
   * List of States
   */
  const [progress, setProgress] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const formikRef = React.useRef(null);
  const classes = useStyles();

  /**
   *
   * List of hooks
   */
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && action === 'edit') {
      getDetail(formikRef, id).then(response => {
        setImages(
          response.data.image.map(i => {
            return {
              ...i,
              hidden: false
            };
          })
        );
      });
    }

    return () => {
      resetForm();
    };
  }, [getDetail]);

  const resetForm = () => {
    formikRef.current.setFieldValue('nama_barang', '');
    formikRef.current.setFieldValue('gambar', []);
    formikRef.current.setFieldValue('teknisi', []);
    formikRef.current.setFieldValue('merk', '');
    formikRef.current.setFieldValue('spesifikasi', '');
    formikRef.current.setFieldValue('keluhan', '');
    formikRef.current.setFieldValue('jenis_barang', '');
  };

  /**
   * Handle Submit Add New Barang
   */
  const handleSubmit = values => {
    setLoading(true);
    let formData = new FormData();
    for (var key in values) {
      if (key === 'teknisi') {
        formData.append(`${key}`, values[key]);
      } else if (key === 'gambar') {
        Array.from(values.gambar).map(i => formData.append('file', i));
      } else {
        formData.append(`${key}`, `${values[key].toString()}`);
      }
    }
    formData.append('order', order.id);
    formData.append('status', 'inserted');
    formData.append('pelanggan', parseInt(order.pelanggan.id));
    if (action === 'add') {
      request
        .post('/api/barang', formData, {
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
          if (response.data.status === 403) {
            alert(`${response.data.status} : ${response.data.message}`);
          } else if (
            response.data.status === 201 ||
            response.data.status === 200
          ) {
            dispatch({ type: 'BARANG_TRIGGER' });
            resetForm();
            handleClose();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (action === 'edit') {
      formData.append('images', JSON.stringify(images));
      request
        .put('/api/barang', formData, {
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
          if (response.data.status === 403) {
            alert(`${response.data.status} : ${response.data.message}`);
          } else if (
            response.data.status === 201 ||
            response.data.status === 200
          ) {
            dispatch({ type: 'BARANG_TRIGGER' });
            resetForm();
            handleClose();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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

  /**
   * Schema formik
   */
  const BarangrSchema = Yup.object().shape({
    nama_barang: Yup.string().required('required'),
    merk: Yup.string().required('required'),
    gambar: Yup.array(),
    jenis_barang: Yup.string().required('required'),
    spesifikasi: Yup.string().required('required'),
    keluhan: Yup.string().required('required'),
    teknisi: Yup.array().min(1, 'Teknisi Harus dipilih minimal 1')
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        id: 0,
        nama_barang: '',
        merk: '',
        jenis_barang: '',
        spesifikasi: '',
        gambar: [],
        teknisi: [],
        keluhan: ''
      }}
      validationSchema={BarangrSchema}
      onSubmit={values => handleSubmit(values)}
      noValidate>
      {props => (
        <>
          <Form onSubmit={props.handleSubmit} noValidate>
            <Dialog
              fullWidth={true}
              maxWidth="md"
              disableBackdropClick={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title">
              <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
                {title}
              </DialogTitle>
              <DialogContent>
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
                              src={`http://localhost:3000/${i.image_path}`}
                              alt={i.image_path}
                              className={classes.detail_img}
                            />
                          </div>
                        </Grid>
                      ) : null
                    )}
                </Grid>
                <BarangForm {...props} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  disabled={loading}>
                  Close
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  onClick={props.handleSubmit}
                  color="secondary"
                  variant="contained">
                  {loading ? `Loading ${progress}%` : 'Tambah'}
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default React.memo(ModalFormBarang);
