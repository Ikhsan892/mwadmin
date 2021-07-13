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
import PaymentForm from '../PaymentForm';

const useStyles = makeStyles(theme => ({}));

export default function ModalAddPayment({ open, handleClose, title }) {
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
    formikRef.current.setFieldValue('name_payment', '');
    formikRef.current.setFieldValue('aktif', false);
  };

  /**
   * Handle Submit Add New Payment
   */
  const handleSubmit = values => {
    setLoading(true);
    let formData = new FormData();
    for (var key in values) {
      formData.append(`${key}`, `${values[key].toString()}`);
    }
    Array.from(values.attachment).map(i => formData.append('file', i));
    request
      .post('/api/payment-method', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ev => {
          const progress = Math.round((ev.loaded / ev.total) * 100);
        }
      })
      .then(data => {
        setLoading(false);
        dispatch({ type: 'PAYMENT_INSERTED' });
        resetForm();
        handleClose();
      })
      .catch(err => {
        alert('tidak berhasil');
        console.log(err);
        setLoading(false);
      });
  };

  /**
   * Schema formik
   */
  const OrderSchema = Yup.object().shape({
    name_payment: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required'),
    aktif: Yup.boolean().required('Required')
  });
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        attachment: [],
        name_payment: '',
        aktif: false
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
                <PaymentForm {...props} />
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
