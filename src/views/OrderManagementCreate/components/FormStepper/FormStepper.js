import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useRouter from 'utils/useRouter';
import CustomerForm from '../CustomerForm';
import BarangForm from '../BarangForm';
// import PembayaranForm from '../PembayaranForm';
import Snackbar from '@material-ui/core/Snackbar';
import ModalConfirmation from '../ModalConfirmation';
import client from 'utils/axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

function getSteps() {
  return [
    'Buat atau Pilih Pelanggan',
    'Buat Informasi Barang'
    // 'Buat Informasi Pembayaran'
  ];
}

function getStepContent(stepIndex, formikProps) {
  switch (stepIndex) {
    case 0:
      return <CustomerForm {...formikProps} autocomplete={true} />;
    case 1:
      return <BarangForm {...formikProps} />;
    // case 2:
    //   return <PembayaranForm {...formikProps} />;
    default:
      return 'Index Tidak Terbaca';
  }
}

export default function FormStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const steps = getSteps();
  const router = useRouter();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // handle Modal Open
  const handleSubmit = async (isOpen, data) => {
    // setFormData(data);
    // setOpenModal(isOpen);
    // let response = await client.post('/api/invoice', data);
    // if (response.status === 201) {
    //   alert(response.data.message);
    //   // Jika response berhasil
    // }
    console.log(data);
  };

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
    tanggal_invoice: Yup.string().required('Required'),
    barang: Yup.array().of(
      Yup.object().shape({
        nama_barang: Yup.string().required('required'),
        merk: Yup.string().required('required'),
        gambar: Yup.array(),
        jenis_barang: Yup.string().required('required'),
        spesifikasi: Yup.string().required('required'),
        keluhan: Yup.string().required('required')
      })
    )
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openToast}
        onClose={() => setOpenToast(false)}
        message="Data Berhasil disimpan"
        key={'top' + 'center'}
      />
      <ModalConfirmation
        data={formData}
        open={openModal}
        handleClose={() => handleSubmit(false, [])}
      />
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Formik
                initialValues={{
                  nama_depan: '',
                  nama_belakang: '',
                  email: '',
                  no_telepon: '',
                  negara: '',
                  umur: '',
                  provinsi: '',
                  kota_kabupaten: '',
                  kecamatan: '',
                  alamat: '',
                  no_invoice: '',
                  tanggal_invoice: '',
                  barang: [
                    {
                      nama_barang: '',
                      merk: '',
                      jenis_barang: '',
                      spesifikasi: '',
                      gambar: [],
                      keluhan: ''
                    }
                  ]
                }}
                validationSchema={OrderSchema}
                onSubmit={values => handleSubmit(true, values)}
                noValidate>
                {props => (
                  <>
                    <Form
                      onSubmit={props.handleSubmit}
                      className={classes.instructions}
                      noValidate>
                      {getStepContent(activeStep, props)}
                      <div style={{ marginTop: 20 }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}>
                          Kembali
                        </Button>
                        {activeStep === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit">
                            Kirim
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}>
                            Selanjutnya
                          </Button>
                        )}
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
