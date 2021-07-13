import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import request from 'utils/axios';
import * as Yup from 'yup';
import BiayaForm from '../BiayaForm';

const ModalBiaya = ({ open, handleClose, title, url, onEdit }) => {
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
    formikRef.current.setFieldValue('nama_biaya', '');
    formikRef.current.setFieldValue('biaya_ditaksir', 0);
    formikRef.current.setFieldValue('is_utama', false);
  };

  /**
   * Handle Submit Add New Biaya
   */
  const handleSubmit = values => {
    setLoading(true);
    if (onEdit) {
      request
        .put(url, values)
        .then(data => {
          setLoading(false);
          dispatch({ type: 'BIAYA_TRIGGER' });
          handleClose();
        })
        .catch(err => {
          alert('tidak berhasil');
          console.log(err);
          setLoading(false);
        });
    } else {
      request
        .post(url, values)
        .then(data => {
          setLoading(false);
          dispatch({ type: 'BIAYA_TRIGGER' });
          resetForm();
          handleClose();
        })
        .catch(err => {
          alert('tidak berhasil');
          console.log(err);
          setLoading(false);
        });
    }
  };

  /**
   * Schema formik
   */
  const OrderSchema = Yup.object().shape({
    nama_biaya: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required'),
    biaya_ditaksir: Yup.number().required('Required'),
    is_utama: Yup.boolean().required('Required')
  });

  useEffect(() => {
    const fetchData = async () => {
      if (onEdit) {
        let response = await request.get(url);
        if (response.data) {
          formikRef.current.setFieldValue(
            'nama_biaya',
            response.data.nama_biaya
          );
          formikRef.current.setFieldValue(
            'biaya_ditaksir',
            response.data.biaya_ditaksir
          );
          formikRef.current.setFieldValue('is_utama', response.data.is_utama);
        }
      }
    };

    fetchData();
  }, [onEdit]);
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        nama_biaya: '',
        biaya_ditaksir: 0,
        is_utama: false
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
                <BiayaForm {...props} />
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
                  {loading ? 'Loading' : 'Simpan'}
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ModalBiaya;
