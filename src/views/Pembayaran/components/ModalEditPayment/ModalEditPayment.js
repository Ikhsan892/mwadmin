import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import request from 'utils/axios';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import PaymentForm from '../PaymentForm';
import client from 'utils/axios';

const useStyles = makeStyles(theme => ({}));

export default function ModalEditPayment({ open, handleClose, title, id }) {
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
  };

  /**
   * Handle Submit Add New Payment
   */
  const handleSubmit = values => {
    setLoading(true);
    request
      .put(`/api/payment-method/${id}`, values)
      .then(data => {
        setLoading(false);
        dispatch({ type: 'PAYMENT_INSERTED' });
        resetForm();
        handleClose();
      })
      .catch(err => {
        alert('tidak berhasil');
        console.log(err);
      });
  };

  /**
   * Use Effect for inserting data
   */
  useEffect(() => {
    const fetchData = async id => {
      let response = await client.get(`/api/payment-method/${id}`);
      if (response.data) {
        formikRef.current.setFieldValue(
          'name_payment',
          response.data.name_payment
        );
      }
    };

    fetchData(id);
  }, [id]);

  /**
   * Schema formik
   */
  const OrderSchema = Yup.object().shape({
    name_payment: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required')
  });
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        name_payment: ''
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
                <PaymentForm {...props} onEdit={true} />
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
                  {loading ? 'Loading' : 'Ubah'}
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </>
      )}
    </Formik>
  );
}
