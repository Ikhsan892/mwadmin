import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import CustomerForm from '../CustomerForm';

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
      return 'Buat Informasi Barang';
    case 2:
      return 'Buat Informasi Pembayaran';
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
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      nama_depan: '',
      nama_belakang: '',
      email: '',
      no_telepon: ''
    },
    validationSchema: OrderSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
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
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className={classes.instructions}>
                {getStepContent(activeStep, formik)}
              </div>
              <Button variant="contained" color="primary" type="submit">
                Test Submit
              </Button>
            </form>
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
