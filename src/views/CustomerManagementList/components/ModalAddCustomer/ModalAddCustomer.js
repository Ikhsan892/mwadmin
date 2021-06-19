import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import React from 'react';
import { CustomerForm } from 'views/OrderManagementCreate/components';
import request from 'utils/axios';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';

const useStyles = makeStyles(theme => ({}));

export default function ModalAddCustomer({ open, handleClose, title }) {
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
    formikRef.current.setFieldValue('nama_depan', '');
    formikRef.current.setFieldValue('nama_belakang', '');
    formikRef.current.setFieldValue('email', '');
    formikRef.current.setFieldValue('no_telepon', '');
    formikRef.current.setFieldValue('negara', '');
    formikRef.current.setFieldValue('umur', '');
    formikRef.current.setFieldValue('gender', '');
    formikRef.current.setFieldValue('provinsi', '');
    formikRef.current.setFieldValue('kota_kabupaten', '');
    formikRef.current.setFieldValue('kecamatan', '');
    formikRef.current.setFieldValue('alamat', '');
  };

  /**
   * Handle Submit Add Customer
   */
  const handleSubmit = values => {
    setLoading(true);
    request
      .post('/api/pelanggan', values)
      .then(data => {
        setLoading(false);
        dispatch({ type: 'PELANGGAN_INSERTED' });
        resetForm();
        handleClose();
      })
      .catch(err => {
        alert('tidak berhasil');
        console.log(err);
      });
  };

  /**
   * Schema formik
   */
  const OrderSchema = Yup.object().shape({
    nama_depan: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required'),
    nama_belakang: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email Input')
      .required('Required'),
    gender: Yup.string().required('Required'),
    no_telepon: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Nomor Telepon Invalid'
      )
      .max(13, 'Kepanjangan')
      .required('Required'),
    negara: Yup.string()
      .min(3, 'Kependekan!')
      .required('Required'),
    provinsi: Yup.string()
      .min(3, 'Kependekan!')
      .required('Required'),
    kota_kabupaten: Yup.string()
      .min(3, 'Kependekan!')
      .required('Required'),
    kecamatan: Yup.string()
      .min(3, 'Kependekan!')
      .required('Required'),
    alamat: Yup.string()
      .min(5, 'Kependekan!')
      .required('Required'),
    umur: Yup.number('Harus Nomor').required('Required')
  });
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        nama_depan: '',
        nama_belakang: '',
        email: '',
        no_telepon: '',
        negara: '',
        umur: '',
        gender: '',
        provinsi: '',
        kota_kabupaten: '',
        kecamatan: '',
        alamat: ''
      }}
      validationSchema={OrderSchema}
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
                <CustomerForm {...props} autocomplete={false} />
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
