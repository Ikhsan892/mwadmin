import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Snackbar
} from '@material-ui/core';
import { Page } from 'components';
import { makeStyles } from '@material-ui/styles';
import { CustomerForm, Header, InfoBarang } from './components';
import client from 'utils/axios';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  invoice: {
    marginBottom: theme.spacing(3)
  }
}));

const OrderSchema = Yup.object().shape({
  nama_depan: Yup.string()
    .min(2, 'Kependekan!')
    .max(50, 'Kepanjangan!')
    .required('Required'),
  gender: Yup.string()
    .min(2, 'Kependekan!')
    .required('Required'),
  nama_belakang: Yup.string()
    .min(2, 'Kependekan!')
    .max(50, 'Kepanjangan!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email Input')
    .required('Required'),
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
  umur: Yup.number('Harus Nomor').required('Required'),
  no_invoice: Yup.string()
    .required('Required')
    .matches(
      /(^MW)[0-9]{5}$/gm,
      'Invoice harus ada MW dan diikuti dengan nomor 5 digit'
    ),
  tanggal_invoice: Yup.string().required('Required')
  // barang: Yup.array().of(
  //   Yup.object().shape({
  //     nama_barang: Yup.string().required('required'),
  //     merk: Yup.string().required('required'),
  //     gambar: Yup.array(),
  //     jenis_barang: Yup.string().required('required'),
  //     spesifikasi: Yup.string().required('required'),
  //     keluhan: Yup.string().required('required')
  //   })
  // )
});
const OrderManagementCreate = () => {
  const classes = useStyles();
  const [openToast, setOpenToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [messageToast, setMessageToast] = React.useState('');
  const router = useRouter();

  // Submit data
  const handleSubmit = async data => {
    setLoading(true);
    let response = await client.post('/api/order', data);
    setLoading(false);
    setOpenToast(true);
    setMessageToast(response.data.message);
    if (response.data.status === 201) {
      router.history.push(`/management/orders/${response.data.data.id}`);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        onClose={() => setOpenToast(false)}
        message={messageToast}
        key={'top' + 'center'}
      />
      <Page className={classes.root} title="Tambah Orderan">
        <Header />
        <Formik
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
            tipe: 'service',
            alamat: '',
            no_invoice: '',
            tanggal_invoice: ''
            // barang: [
            //   {
            //     nama_barang: '',
            //     merk: '',
            //     jenis_barang: '',
            //     spesifikasi: '',
            //     gambar: [],
            //     keluhan: ''
            //   }
            // ]
          }}
          validationSchema={OrderSchema}
          onSubmit={values => handleSubmit(values)}
          noValidate>
          {props => (
            <>
              <Form
                onSubmit={props.handleSubmit}
                className={classes.instructions}
                noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Informasi Pelanggan" />
                      <CardContent>
                        <CustomerForm {...props} autocomplete={true} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Informasi Barang" />
                      <CardContent>
                        <InfoBarang {...props} />
                      </CardContent>
                      <CardActions>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          color="primary">
                          {loading ? 'Loading' : 'Tambah Barang'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Page>
    </>
  );
};

export default OrderManagementCreate;
