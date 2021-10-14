import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import client from 'utils/axios';
import { formatRupiah } from 'utils/formatRupiah';
import { ModalDP, ModalPayment } from '..';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const OrderInfo = props => {
  const { order, className, ...rest } = props;
  const { total_product } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [statusOrderan, setStatusOrderan] = useState(order.status);
  const [openModalDP, setOpenModalDP] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  const handleChange = async event => {
    event.persist();
    if (event.target.value === 'pembayaran dp') {
      setOpenModalDP(true);
    }
    setStatusOrderan(event.target.value);
    try {
      await changeStatusOrder(event.target.value);
      if (event.target.value !== 'pembayaran dp') {
        dispatch({
          type: 'MESSAGE_INFO_OPEN_TRIGGER',
          payload: {
            message: 'Success Ubah Status',
            severity: 'success'
          }
        });
      }
    } catch (e) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Error saat ubah status orderan, coba lagi ya',
          severity: 'error'
        }
      });
    }
  };

  const changeStatusOrder = async status => {
    await client.put(`/api/order/update-status/${order.id}`, {
      status: status
    });
  };

  const changeGrandTotal = async value => {
    await client.put(`/api/order/total/${order.id}`, {
      total: value
    });
  };

  const grand_total = useMemo(() => {
    return total_product;
  }, [total_product]);

  useEffect(() => {
    changeGrandTotal(total_product);
  }, [total_product, changeGrandTotal]);

  return (
    <>
      <ModalPayment
        order={order.id}
        open={openModalPayment}
        handleClose={() => setOpenModalPayment(false)}
      />
      <ModalDP
        open={openModalDP}
        handleClose={() => setOpenModalDP(false)}
        order={order.id}
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Info Order" />
        <Divider />
        <CardContent className={classes.content}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Pelanggan</TableCell>
                <TableCell>
                  <Link component={RouterLink} to="/management/customers/1">
                    {order.pelanggan.nama_depan} {order.pelanggan.nama_belakang}
                  </Link>
                  <div>{order.pelanggan.alamat}</div>
                  <div>{order.pelanggan.kota_kabupaten}</div>
                  <div>{order.pelanggan.negara}</div>
                </TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>ID</TableCell>
                <TableCell>#{order.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No Invoice</TableCell>
                <TableCell>{order.no_invoice}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Tipe Invoice</TableCell>
                <TableCell>
                  <Typography variant="overline">{order.tipe}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tanggal Dibuat</TableCell>
                <TableCell>
                  {moment(order.created_at).format('DD/MM/YYYY HH:MM')}
                </TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Grand Total</TableCell>
                <TableCell>
                  {formatRupiah(grand_total.toString(), '')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status Orderan</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="option"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={statusOrderan}
                    variant="outlined">
                    <option value="new request">New Request</option>
                    <option value="menunggu kepastian">
                      Menunggu Kepastian Pelanggan
                    </option>
                    <option value="order batal">
                      Order Dibatalkan Pelanggan
                    </option>
                    <option value="menunggu pembayaran">
                      Menunggu Pembayaran
                    </option>
                    <option value="pembayaran dp">Pembayaran DP</option>
                    <option value="pembayaran lunas">Pembayaran Lunas</option>
                    <option value="pembayaran diakhir">
                      Pembayaran Diakhir
                    </option>
                    <option value="refund">Uang Kembali ( Refund )</option>
                    <option value="pengecekan teknisi">
                      Pengecekan Oleh Teknisi
                    </option>
                    <option value="hasil pengecekan">
                      Hasil Pengecekan Oleh Teknisi
                    </option>
                    <option value="pembelian sparepart">
                      Menunggu Pembelian Sparepart
                    </option>
                    <option value="sparepart lengkap">
                      Sparepart Sudah Lengkap
                    </option>
                    <option value="pengerjaan barang">Pengerjaan Servis</option>
                    <option value="pengecekan terakhir">
                      Pengecekan Terakhir Service
                    </option>
                    <option value="packing barang">Packing Barang</option>
                    <option value="pengiriman barang">Pengiriman Barang</option>
                    <option value="barang diterima">Barang Diterima</option>
                    <option value="Order Selesai">Order Selesai</option>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Metode Pembayaran</TableCell>
                <TableCell>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                      {order.payment ? (
                        <Avatar
                          alt={`Image Payment ${order.payment.name_payment}`}
                          src={
                            order.payment.image_path
                              ? `${process.env.REACT_APP_SERVER_URL}/${order.payment.image_path}`
                              : '/images/default.png'
                          }
                        />
                      ) : (
                        'No Payment Method'
                      )}
                    </Grid>
                    {order.payment ? (
                      <Grid item>
                        {order.payment.name_payment.toUpperCase()}
                      </Grid>
                    ) : null}
                    <Grid item>
                      <IconButton
                        size="small"
                        onClick={() => setOpenModalPayment(true)}>
                        <BorderColorIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Metode Pengiriman</TableCell>
                <TableCell>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                      {order.pengiriman?.nama_pengiriman ||
                        'No Shipping Method'}
                    </Grid>
                    <Grid item>
                      <IconButton size="small">
                        <BorderColorIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

OrderInfo.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderInfo;
