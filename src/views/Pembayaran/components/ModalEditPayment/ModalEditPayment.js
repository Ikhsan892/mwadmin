import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
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

const useStyles = makeStyles(theme => ({
  img_preview: {
    objectFit: 'cover',
    margin: '0 auto',
    width: '250px',
    height: 'auto'
  }
}));

export default function ModalEditPayment({ open, handleClose, title, id }) {
  /**
   * List of States
   */
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const formikRef = React.useRef(null);

  const classes = useStyles();
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
    let formData = new FormData();
    for (var key in values) {
      formData.append(`${key}`, `${values[key].toString()}`);
    }
    Array.from(values.attachment).map(i => formData.append('file', i));
    request
      .put(`/api/payment-method/${id}`, formData, {
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
        response.data.image_path
          ? setImage(`http://localhost:3000${response.data.image_path}`)
          : setImage('');
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
        attachment: [],
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
                <Grid container>
                  <Grid xs={12}>
                    <img
                      src={image === '' ? `/images/default.png` : image}
                      className={classes.img_preview}
                    />
                  </Grid>
                </Grid>
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
