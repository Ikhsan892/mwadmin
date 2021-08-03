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
import PengirimanForm from '../PengirimanForm';

const ModalPengiriman = ({ open, handleClose, title, url, onEdit }) => {
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
    formikRef.current.setFieldValue('nama_pengiriman', '');
    formikRef.current.setFieldValue('aktif', false);
  };

  /**
   * Handle Submit Add New Biaya
   */
  const handleSubmit = values => {
    setLoading(true);
    let formData = new FormData();
    for (var key in values) {
      formData.append(`${key}`, `${values[key].toString()}`);
    }
    Array.from(values.attachment).map(i => formData.append('file', i));
    if (onEdit) {
      request
        .put(url, formData)
        .then(data => {
          setLoading(false);
          dispatch({ type: 'PENGIRIMAN_TRIGGER' });
          handleClose();
        })
        .catch(err => {
          alert('tidak berhasil');
          console.log(err);
          setLoading(false);
        });
    } else {
      request
        .post(url, formData)
        .then(data => {
          setLoading(false);
          dispatch({ type: 'PENGIRIMAN_TRIGGER' });
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
    nama_pengiriman: Yup.string()
      .min(2, 'Kependekan!')
      .max(50, 'Kepanjangan!')
      .required('Required'),
    aktif: Yup.boolean().required('Required')
  });

  useEffect(() => {
    const fetchData = async () => {
      if (onEdit) {
        let response = await request.get(url);
        if (response.data) {
          formikRef.current.setFieldValue(
            'nama_pengiriman',
            response.data.nama_pengiriman
          );
          formikRef.current.setFieldValue('aktif', response.data.aktif);
        }
      }
    };

    fetchData();
  }, [onEdit]);
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        attachment: [],
        nama_pengiriman: '',
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
                <PengirimanForm {...props} />
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

export default ModalPengiriman;
