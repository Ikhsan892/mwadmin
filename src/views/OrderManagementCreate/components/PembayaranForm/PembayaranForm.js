import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  MenuItem,
  InputLabel,
  Switch,
  FormControl,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import client from 'utils/axios';
import { FieldArray, Field } from 'formik';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import useRouter from 'utils/useRouter';
import { TextField, Select, RadioGroup } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: '0px'
  },
  cardBackground: {
    backgroundColor: 'inherit',
    border: '2px dashed #c2c2c2',
    fontSize: '1.5rem',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  cardcontent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  radio: {
    padding: 0
  },
  logo: {
    width: 'auto',
    height: 30
  },
  menu: {
    textTransform: 'capitalize'
  }
}));
const PembayaranForm = props => {
  const classes = useStyles();
  const [metode, setMetode] = useState([]);
  const [statusPembayaran, setStatusPembayaran] = useState([]);
  const [kurir, setKurir] = useState([]);
  const [pakeDiskon, setPakeDiskon] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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

  // Get Payment Method
  const getPembayaranData = async () => {
    let data = await client.get('/api/metode-pembayaran');
    setMetode(data.data);
  };

  // Get Keterangan Pembayaran
  const getPaymentStatus = async () => {
    let data = await client.get('/api/status-pembayaran');
    setStatusPembayaran(data.data);
  };

  // Get Kurir
  const getKurir = async () => {
    let data = await client.get('/api/kurir');
    setKurir(data.data);
  };

  // Generate Invoice Random Number
  const generateRandom = () => {
    let number = Math.floor(Math.random() * 99999) + 10000; // returns a random integer from 1 to 100
    let mergeString = 'MW' + number;
    props.setFieldValue('no_invoice', mergeString);
  };

  useEffect(() => {
    setLoading(true);
    getPembayaranData();
    getPaymentStatus();
    getKurir();
    setLoading(false);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Nomor Invoice</Typography>
          <Divider className={classes.divider} />
        </Grid>
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
        <Grid item xs={12}>
          <Typography variant="h3">Metode Pembayaran</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Grid container row spacing={2}>
            {loading
              ? [1, 2, 3, 4].map(j => (
                  <Skeleton style={{ width: '100%', height: '100%' }} />
                ))
              : metode.map(i => (
                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <Card variant="outlined">
                      <CardContent className={classes.cardcontent}>
                        <Field
                          type="radio"
                          id="metode_pembayaran"
                          disabled={false}
                          value={i.nama_metode_pembayaran}
                          name="metode_pembayaran"
                        />
                        <img src={i.logo_metode} className={classes.logo} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Card
                className={classes.cardBackground}
                onClick={() => router.history.push('/pengaturan/pembayaran')}>
                <CardContent className={classes.cardcontent}>+</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Keterangan Pembayaran</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            {loading ? (
              <Skeleton height={35} style={{ width: '100%' }} />
            ) : (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                    <InputLabel htmlFor="status_pembayaran">
                      Status Pembayaran
                    </InputLabel>
                    <Field
                      component={Select}
                      name="status_pembayaran"
                      disabled={false}
                      inputProps={{
                        id: 'status_pembayaran'
                      }}>
                      {statusPembayaran.map(i => (
                        <MenuItem
                          value={i.nama_status_pembayaran}
                          className={classes.menu}>
                          {i.nama_status_pembayaran}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {props.values.status_pembayaran === 'dp' ? (
                    <Field
                      component={TextField}
                      type="number"
                      name="dp"
                      variant="outlined"
                      disabled={false}
                      style={{
                        width: '100%'
                      }}
                      label="Total DP"
                      inputProps={{
                        id: 'status_pembayaran'
                      }}
                    />
                  ) : (
                    ''
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {props.values.status_pembayaran === 'lunas' ? (
          ' '
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h3">Jatuh Tempo</Typography>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="jatuh_tempo"
                disabled={false}
                type="date"
                variant="outlined"
                fullwidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Pengiriman</Typography>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={RadioGroup}
                    name="pengiriman"
                    disabled={false}>
                    {loading
                      ? 'Loading...'
                      : kurir.map(i => (
                          <FormControlLabel
                            value={i.nama_kurir}
                            control={<Radio />}
                            label={`${i.nama_kurir}`}
                          />
                        ))}
                  </Field>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Ongkir</Typography>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="ongkir"
                    type="number"
                    disabled={false}
                    label="Ongkir"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => router.history.push('/pengaturan/pengiriman')}>
            Tambah Kurir
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            Biaya Tambahan{' '}
            <span>
              <Button
                color="secondary"
                onClick={() => router.history.push('/pengaturan/biaya')}>
                Tambah Nilai Default
              </Button>
            </span>
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <FieldArray
            name="biaya_tambahan"
            render={arrayHelpers => (
              <>
                {props.values.biaya_tambahan.length > 0 &&
                  props.values.biaya_tambahan.map((b, index) => (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Field
                            component={TextField}
                            name={`biaya_tambahan.${index}.nama_biaya`}
                            label="Nama Biaya"
                            disabled={false}
                            placeholder="Ex : Biaya Service | Biaya Garansi"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={TextField}
                            disabled={false}
                            name={`biaya_tambahan.${index}.total_biaya`}
                            label="Total Biaya"
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      {index > 0 ? (
                        <Button
                          color="secondary"
                          onClick={() => arrayHelpers.remove(index)}>
                          <RemoveIcon /> Hapus Biaya
                        </Button>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
                <Button
                  color="primary"
                  onClick={() =>
                    arrayHelpers.push({ nama_biaya: '', total_biaya: 0 })
                  }>
                  <AddIcon /> Tambah Biaya
                </Button>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            Diskon{' '}
            <span>
              <Switch
                checked={pakeDiskon}
                onChange={() => setPakeDiskon(!pakeDiskon)}
                color="primary"
              />
            </span>
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          {pakeDiskon ? (
            <FieldArray
              name="diskon"
              render={arrayHelpers => (
                <>
                  {props.values.diskon.length > 0 &&
                    props.values.diskon.map((b, index) => (
                      <>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              disabled={false}
                              name={`diskon.${index}.nama_diskon`}
                              label="Nama Diskon"
                              placeholder="Ex : MW Ultah"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              disabled={false}
                              name={`diskon.${index}.total_diskon`}
                              label="Total Diskon Terpakai"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        {index > 0 ? (
                          <Button
                            color="secondary"
                            onClick={() => arrayHelpers.remove(index)}>
                            <RemoveIcon /> Hapus Diskon
                          </Button>
                        ) : (
                          ''
                        )}
                      </>
                    ))}
                  <Button
                    color="primary"
                    onClick={() =>
                      arrayHelpers.push({ nama_biaya: '', total_biaya: 0 })
                    }>
                    <AddIcon /> Tambah Diskon
                  </Button>
                </>
              )}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PembayaranForm;
