import React from 'react';
import { Grid, Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { FieldArray, Field } from 'formik';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/styles';
import { FilesDropzone } from 'components';

const useStyles = makeStyles(theme => ({
  invoice: {
    marginBottom: theme.spacing(3)
  }
}));
const BarangForm = ({ ...props }) => {
  const classes = useStyles();

  // Generate Invoice Random Number
  const generateRandom = () => {
    let number = Math.floor(Math.random() * 99999) + 10000; // returns a random integer from 1 to 100
    let mergeString = 'MW' + number;
    props.setFieldValue('no_invoice', mergeString);
  };

  const defaultProps = {
    m: 1,
    border: 1,
    style: {
      width: 'auto',
      height: 'auto',
      padding: '20px',
      borderRadius: '5px'
    }
  };
  return (
    <>
      <Grid container spacing={2} className={classes.invoice}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Field
                component={TextField}
                disabled={false}
                variant="outlined"
                style={{ width: '100%' }}
                label="Nomor Invoice"
                name="no_invoice"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button
                type="button"
                color="primary"
                variant="outlined"
                onClick={generateRandom}>
                Generate Number
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Field
            component={TextField}
            style={{ width: '100%' }}
            disabled={false}
            name="tanggal_invoice"
            type="date"
            variant="outlined"
            label="Tanggal Invoice"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <FieldArray
          name="barang"
          render={arrayHelpers => (
            <>
              {props.values.barang.length > 0 &&
                props.values.barang.map((b, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card>
                      <CardHeader
                        title={`Barang ${index + 1}`}
                        action={
                          index > 0 ? (
                            <Button
                              color="secondary"
                              onClick={() => arrayHelpers.remove(index)}>
                              <RemoveIcon /> Hapus Barang
                            </Button>
                          ) : (
                            ''
                          )
                        }
                      />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <FilesDropzone
                              multiple={true}
                              formik={props}
                              name={`barang.${index}.gambar`}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              style={{ width: '100%' }}
                              disabled={false}
                              name={`barang.${index}.nama_barang`}
                              type="text"
                              variant="outlined"
                              label="Nama Barang"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              style={{ width: '100%' }}
                              disabled={false}
                              name={`barang.${index}.merk`}
                              type="text"
                              variant="outlined"
                              label="Merk"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              style={{ width: '100%' }}
                              disabled={false}
                              placeholder="Samsung J1 2015"
                              name={`barang.${index}.spesifikasi`}
                              type="text"
                              variant="outlined"
                              label="Spesifikasi"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              placeholder="Android | IOS | PC | Tablet | Etc"
                              style={{ width: '100%' }}
                              disabled={false}
                              name={`barang.${index}.jenis_barang`}
                              type="text"
                              variant="outlined"
                              label="Jenis Barang"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              multiline
                              rows={5}
                              placeholder="Keluhan Pelanggan"
                              style={{ width: '100%' }}
                              disabled={false}
                              name={`barang.${index}.keluhan`}
                              type="text"
                              variant="outlined"
                              label="Keluhan"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              <Button
                color="primary"
                onClick={() =>
                  arrayHelpers.push({
                    nama_barang: '',
                    merk: '',
                    jenis_barang: '',
                    spesifikasi: '',
                    gambar: [],
                    keluhan: ''
                  })
                }>
                <AddIcon /> Tambah Barang
              </Button>
            </>
          )}
        />
      </Grid>
    </>
  );
};

export default BarangForm;
