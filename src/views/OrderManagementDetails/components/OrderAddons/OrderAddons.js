import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/styles';
import client from 'utils/axios';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ListProductAndSparepart } from '..';
import { formatRupiah } from 'utils/formatRupiah';
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  tblFooter: {
    fontSize: 15,
    fontStyle: 'bold'
  }
}));

const OrderItems = props => {
  const { order, className, ...rest } = props;
  const [inventory, setInventory] = useState([]);
  const dispatch = useDispatch();
  const [selectedSparepart, setSelectedSparepart] = useState([]);
  const classes = useStyles();

  // fetch for autocomplete data
  const productAndSparepartFetch = useCallback(async () => {
    let response = await client.get('/api/inventory/active');
    setInventory(response.data);
  }, []);

  // fetch selected product
  const fetchSelectedProduct = useCallback(async () => {
    let response = await client.get(`/api/order/selected/${order.id}`);
    setSelectedSparepart(response.data);
  }, []);

  // Fetch Selected Sparepar
  const saveSelectedProduct = async (product, id) => {
    let response = await client.post('/api/order/selected-product', {
      ...product,
      order: id
    });
    return response.data;
  };

  const deleteSelectedProduct = async id => {
    let response = await client.delete(
      `/api/order/delete-selected/${order.id}/${id}`
    );
    return response.data;
  };

  const changeStokAPI = async (id, stok, total) => {
    let response = await client.put(
      `/api/order/update-selected/${id}/${stok}/${total}`
    );
    return response.data;
  };

  const saveSelectedSparepart = async (sparepart, id) => {
    let response = await client.post('/api/order/selected-sparepart', {
      ...sparepart,
      order: id
    });
    return response.data;
  };

  const handleSelectedSparepart = useCallback(async (newEvent, value) => {
    let selected = {};
    if (value?.id) {
      if (
        value?.tipe_barang === 'accessories' ||
        value?.tipe_barang === 'produk'
      ) {
        try {
          let product = await saveSelectedProduct(
            { ...value, stok: 1, total_harga: value?.harga_jual * 1 },
            order.id
          );
          if (product?.message.id) {
            selected = {
              id: product.message.id,
              tipe_barang: value?.tipe_barang,
              nama_barang: value?.nama_barang,
              harga_jual: value?.harga_jual,
              total_stok: product.message.total_stok,
              idUnique: `prod-${product.message.id}-${product.message.tipe_barang}`,
              defaultSelect: 1,
              total: product.message.total_harga
            };
            setSelectedSparepart(prevState => {
              return prevState.concat([selected]);
            });
          }
        } catch (err) {
          selected = {};
          alert('cannot select the sparepart, please try again');
        }
      } else if (value?.tipe_barang === 'sparepart') {
        try {
          let sparepart = await saveSelectedSparepart(
            { ...value, stok: 1, total_harga: value?.harga_jual * 1 },
            order.id
          );
          if (sparepart?.message.id) {
            selected = {
              id: sparepart.message.id,
              tipe_barang: value?.tipe_barang,
              nama_barang: value?.nama_barang,
              harga_jual: value?.harga_jual,
              total_stok: sparepart.message.total_stok,
              idUnique: `prod-${sparepart.message.id}-${sparepart.message.tipe_barang}`,
              defaultSelect: 1,
              total: sparepart.message.total_harga
            };
            setSelectedSparepart(prevState => {
              return prevState.concat([selected]);
            });
          }
        } catch (err) {
          selected = {};
          alert('cannot select the sparepart, please try again');
        }
      }
    } else {
      selected = {};
    }
  }, []);

  const removeSelected = useCallback(
    async (id, tipe) => {
      setSelectedSparepart(prevState => {
        return prevState.filter(i => i.idUnique !== `prod-${id}-${tipe}`);
      });
      await deleteSelectedProduct(id);
    },
    [selectedSparepart]
  );

  const changeStok = useCallback(
    async (id, tipe, value, harga_juals) => {
      if (value < 1) {
        removeSelected(id, tipe);
      } else {
        setSelectedSparepart(prevState => {
          return prevState.map(i => {
            if (i.idUnique === `prod-${id}-${tipe}`) {
              return {
                ...i,
                defaultSelect: +value,
                total: +value * i.harga_jual
              };
            } else {
              return i;
            }
          });
        });
        await changeStokAPI(id, +value, +value * harga_juals);
      }
    },
    [selectedSparepart]
  );

  const grandTotal = useMemo(() => {
    dispatch({
      type: 'GRAND_TOTAL_PRODUCT',
      value: selectedSparepart.reduce((a, b) => a + (b['total'] || 0), 0)
    });
    return selectedSparepart.reduce((a, b) => a + (b['total'] || 0), 0);
  }, [selectedSparepart]);

  useEffect(() => {
    productAndSparepartFetch();
    fetchSelectedProduct();
  }, [productAndSparepartFetch, fetchSelectedProduct]);

  return (
    <>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          title="Sparepart &amp; Produk"
          action={
            <ListProductAndSparepart
              label="Cari Produk"
              options={inventory}
              onChange={handleSelectedSparepart}
            />
          }
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Barang</TableCell>
                    <TableCell>Jenis</TableCell>
                    <TableCell>Kuantitas</TableCell>
                    <TableCell>Total Harga</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedSparepart.map(item => (
                    <TableRow>
                      <TableCell>{item.nama_barang}</TableCell>
                      <TableCell>{item.tipe_barang}</TableCell>
                      <TableCell>
                        <Grid
                          container
                          spacing={1}
                          justifyContent="space-between">
                          <Grid item xs={2}>
                            <IconButton
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                changeStok(
                                  item.id,
                                  item.tipe_barang,
                                  item.defaultSelect + 1,
                                  item.harga_jual
                                )
                              }
                              size="small">
                              <AddIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              type="number"
                              error={item.defaultSelect > item.total_stok}
                              helperText={
                                item.defaultSelect > item.total_stok
                                  ? 'Stok menipis bro inget...!!'
                                  : ''
                              }
                              min={0}
                              max={item.stok}
                              value={item.defaultSelect}
                              onChange={event =>
                                changeStok(
                                  item.id,
                                  item.tipe_barang,
                                  event.target.value,
                                  item.harga_jual
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() =>
                                changeStok(
                                  item.id,
                                  item.tipe_barang,
                                  item.defaultSelect - 1,
                                  item.harga_jual
                                )
                              }>
                              <RemoveIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        {formatRupiah(item.total.toString(), '')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            removeSelected(item.id, item.tipe_barang)
                          }>
                          <RemoveCircleIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableCell
                    colSpan={2}
                    align="right"
                    className={classes.tblFooter}>
                    Total
                  </TableCell>
                  <TableCell className={classes.tblFooter} colSpan={2}>
                    {formatRupiah(grandTotal.toString(), '')}
                  </TableCell>
                </TableFooter>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderItems;
