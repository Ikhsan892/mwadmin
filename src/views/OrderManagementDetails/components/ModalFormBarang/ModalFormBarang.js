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

export default function ModalFormBarang({ open, handleClose, title }) {
  /**
   * List of States
   */
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
    formikRef.current.setFieldValue('merk', '');
    formikRef.current.setFieldValue('spesifikasi', '');
    formikRef.current.setFieldValue('keluhan', '');
    formikRef.current.setFieldValue('jenis_barang', '');
  };

  /**
   * Handle Submit Add New Payment
   */
  const handleSubmit = values => {
    console.log(values);
    resetForm();
    // setLoading(true);
    // let formData = new FormData();
    // for (var key in values) {
    //   formData.append(`${key}`, `${values[key].toString()}`);
    // }
    // Array.from(values.attachment).map(i => formData.append('file', i));
    // request
    //   .post('/api/payment-method', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     onUploadProgress: ev => {
    //       const progress = Math.round((ev.loaded / ev.total) * 100);
    //     }
    //   })
    //   .then(data => {
    //     setLoading(false);
    //     dispatch({ type: 'PAYMENT_INSERTED' });
    //     resetForm();
    //     handleClose();
    //   })
    //   .catch(err => {
    //     alert('tidak berhasil');
    //     console.log(err);
    //     setLoading(false);
    //   });
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
    keluhan: Yup.string().required('required')
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
                  {loading ? 'Loading' : 'Tambah'}
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </>
      )}
    </Formik>
  );
}
