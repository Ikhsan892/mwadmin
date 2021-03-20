import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import CustomerForm from '../CustomerForm';
import BarangForm from '../BarangForm';
import PembayaranForm from '../PembayaranForm';

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
    'Buat Informasi Barang',
    'Buat Informasi Pembayaran'
  ];
}

function getStepContent(stepIndex, formikProps) {
  switch (stepIndex) {
    case 0:
      return <CustomerForm {...formikProps} />;
    case 1:
      return <BarangForm {...formikProps} />;
    case 2:
      return <PembayaranForm {...formikProps} />;
    default:
      return 'Index Tidak Terbaca';
  }
}

export default function FormStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
    barang: Yup.array().of(
      Yup.object().shape({
        nama_barang: Yup.string().required('required'),
        kerusakan: Yup.array().of(
          Yup.object().shape({
            nama_kerusakan: Yup.string()
              .min(3, 'Kependekan!')
              .required('Nama Kerusakan tidak Boleh Kosong'),
            sparepart: Yup.array().of(
              Yup.object().shape({
                nama_sparepart: Yup.string()
                  .min(3, 'Kependekan!')
                  .required('Required'),
                harga: Yup.number().required('Required')
              })
            )
          })
        )
      })
    ),
    no_invoice: Yup.string()
      .required('Required')
      .matches(
        /(^MW)[0-9]{5}$/gm,
        'Invoice harus ada MW dan diikuti dengan nomor 5 digit'
      ),
    metode_pembayaran: Yup.string().required('Required'),
    dp: Yup.number(),
    jatuh_tempo: Yup.string().required('Required'),
    diskon: Yup.array().of(
      Yup.object().shape({
        nama_diskon: Yup.string().min(3, 'Kependekan'),
        total_diskon: Yup.number().min(3, 'Kependekan')
      })
    ),
    biaya_tambahan: Yup.array().of(
      Yup.object().shape({
        nama_biaya: Yup.string().required('Required'),
        total_biaya: Yup.string().required('Required')
      })
    ),
    pengiriman: Yup.string().required('Required'),
    ongkir: Yup.number().required('Required'),
    note : Yup.string(),
  });

  return (
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
                barang: [
                  {
                    nama_barang: '',
                    kerusakan: [
                      {
                        nama_kerusakan: '',
                        sparepart: [
                          {
                            nama_sparepart: '',
                            harga: ''
                          }
                        ]
                      }
                    ]
                  }
                ],
                no_invoice: '',
                metode_pembayaran: '',
                dp: '',
                jatuh_tempo: '',
                diskon: [
                  {
                    nama_diskon: '',
                    total_diskon: ''
                  }
                ],
                biaya_tambahan: [
                  {
                    nama_biaya: '',
                    total_biaya: ''
                  }
                ],
                pengiriman: '',
                ongkir: '',
                note : ''
              }}
              validationSchema={OrderSchema}
              onSubmit={values => {
                alert(JSON.stringify(values, null, 2));
              }}
              noValidate>
              {props => (
                <Form
                  onSubmit={props.handleSubmit}
                  className={classes.instructions}
                  noValidate>
                  {getStepContent(activeStep, props)}
                  <Button variant="contained" color="primary" type="submit">
                    Test Submit
                  </Button>
                </Form>
              )}
            </Formik>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
