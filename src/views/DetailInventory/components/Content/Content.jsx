import {
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Grid,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import { Label } from 'components';
import React, { Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatRupiah } from 'utils/formatRupiah';
import ProductChart from '../ProductChart/ProductChart';
import axios from 'utils/axios';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(9)
  },
  image: {
    maxHeight: 350,
    objectFit: 'contain'
  },
  deleteBtn: {
    color: theme.palette.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900]
    }
  },
  chart: {
    marginTop: theme.spacing(2)
  },
  profit: {
    padding: theme.spacing(1),
    borderRadius: 20,
    backgroundColor: colors.green[100],
    color: colors.green[600]
  },
  tipe_barang: {
    textTransform: 'capitalize'
  },
  no_image: {
    textAlign: 'center'
  }
}));

const Content = ({ detail }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const isSparepart = useCallback((data, spesifikasi) => {
    if (data === 'sparepart') {
      return (
        <Grid item xs={12} md={6}>
          <Typography variant="overline">Spesifikasi Barang</Typography>
          <Typography variant="h5" className={classes.tipe_barang}>
            {spesifikasi || '-'}
          </Typography>
        </Grid>
      );
    }
  }, []);

  const handleDelete = useCallback(async (id, tipe_barang) => {
    let confirm = window.confirm('Are you sure want to delete this product');
    if (confirm) {
      await axios
        .delete('/api/inventory/single', {
          data: {
            id: id || 0,
            tipe_barang: tipe_barang || 'accessories'
          }
        })
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: 'MESSAGE_INFO_OPEN_TRIGGER',
              payload: { message: 'Success Delete', severity: 'success' }
            });
            router.history.push('/inventory/list');
          }
        })
        .catch(error => {
          console.log(error.response);
          dispatch({
            type: 'MESSAGE_INFO_OPEN_TRIGGER',
            payload: { message: 'Failed Delete', severity: 'error' }
          });
        });
    }
  }, []);

  return (
    <Fragment>
      <Grid className={classes.content} container spacing={4}>
        <Grid item xs={12} md={6}>
          {detail.data?.image.length > 0 ? (
            <Carousel showArrows={false}>
              {detail.data?.image &&
                detail.data?.image.map(i => (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/${i.image_path}`}
                    alt={i.image_path}
                    className={classes.image}
                  />
                ))}
            </Carousel>
          ) : (
            <>
              <img
                src="/images/undraw_no_data_qbuo.svg"
                alt="No Image"
                className={classes.image}
              />
              <Typography variant="h4" className={classes.no_image}>
                No Image
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              action={
                <Button
                  className={classes.deleteBtn}
                  color="secondary"
                  onClick={() =>
                    handleDelete(detail.data?.id, detail.data?.tipe_barang)
                  }>
                  <DeleteIcon />
                  Delete
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Nama Barang</Typography>
                  <Typography variant="h5">
                    {detail.data?.nama_barang}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Merk</Typography>
                  <Typography variant="h5">
                    {detail.data?.merk_barang}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Stok</Typography>
                  <Typography variant="h5">
                    {detail.data?.stok}{' '}
                    {detail.data?.stok < 5 ? (
                      <Label color={colors.yellow[700]}>Menipis</Label>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Tipe Barang</Typography>
                  <Typography variant="h5" className={classes.tipe_barang}>
                    {detail.data?.tipe_barang || '-'}
                  </Typography>
                </Grid>
                {isSparepart(
                  detail.data?.tipe_barang,
                  detail.data?.spesifikasi_barang
                )}
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Harga Beli</Typography>
                  <Typography variant="h5">
                    Rp {formatRupiah(detail.data?.harga_beli || 0)},-
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline">Harga Jual</Typography>
                  <Typography variant="h5">
                    Rp {formatRupiah(detail.data?.harga_jual || 0)},-
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline" gutterBottom>
                    Profit
                  </Typography>
                  <Typography variant="h5" style={{ marginTop: 10 }}>
                    <span className={classes.profit}>
                      {detail.data?.harga_beli < 1
                        ? 0
                        : Math.floor(
                            ((detail.data?.harga_jual -
                              detail.data?.harga_beli) /
                              detail.data?.harga_beli) *
                              100
                          )}
                      %
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline" gutterBottom>
                    Penjualan {new Date().getFullYear()}
                  </Typography>
                  <div className={classes.chart}>
                    <ProductChart />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline" gutterBottom>
                    Total Penjualan {new Date().getFullYear()}
                  </Typography>
                  <Typography variant="h5">12 Item</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="overline" gutterBottom>
                    Proyeksi Keuntungan Sepanjang {new Date().getFullYear()}
                  </Typography>
                  <Typography variant="h5">Rp 120.000,-</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="overline">Deskripsi</Typography>
                  <Typography variant="h5">{detail.data?.deskripsi}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Content;
