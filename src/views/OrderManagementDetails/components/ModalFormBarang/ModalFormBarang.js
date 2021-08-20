import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import React from 'react';
import request from 'utils/axios';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import BarangForm from '../BarangForm';

const useStyles = makeStyles(theme => ({}));

export default function ModalFormBarang({
  open,
  order,
  handleClose,
  title,
  action = 'add'
}) {
  /**
   * List of States
   */
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const formikRef = React.useRef(null);

  /**
   *
   * List of hooks
   */
  const dispatch = useDispatch();

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
      alert('edit');
    }
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
                <BarangForm {...props} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
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
}
