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
import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef
} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ListProductAndSparepart } from '..';
import { formatRupiah } from 'utils/formatRupiah';
import { ModalBiaya } from '..';
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

const OrderDiskonPengurangan = props => {
  const { order, className, ...rest } = props;
  const dispatch = useDispatch();
  const [selectedBiaya, setSelectedBiaya] = useState([]);
  const [openModalAddBiaya, setOpenModalAddBiaya] = useState(false);
  const classes = useStyles();
  const biayaRef = useRef(null);

  const onSelectedBiaya = async value => {
    let findDuplicate = selectedBiaya.filter(
      i => i.nama_biaya.toLowerCase() === value.toLowerCase()
    );
    if (findDuplicate.length < 1) {
      let selected = {
        id: uuidv4(),
        nama_biaya: value,
        total: 0
      };
      setSelectedBiaya(prevState => {
        return prevState.concat([selected]);
      });

      await saveSelectedBiaya(selected);
    } else {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Nama Biaya Sudah ada ',
          severity: 'error'
        }
      });
    }
    handleCloseModal();
  };

  const handleCloseModal = () => setOpenModalAddBiaya(false);
  //   fetch selected biaya
  const fetchSelectedBiaya = useCallback(async () => {
    let response = await client.get(`/api/order-biayapengurangan/${order.id}`);
    setSelectedBiaya(response.data);
  }, []);

  // Simpan Selected Biaya
  const saveSelectedBiaya = async product => {
    let response = await client.post(
      '/api/order-biayapengurangan/selected-biaya',
      {
        ...product,
        order: order.id
      }
    );
    return response.data;
  };

  const deleteSelectedBiaya = async nama_biaya => {
    let response = await client.delete(
      `/api/order-biayapengurangan/delete-selected/${order.id}/${nama_biaya}`
    );
    return response.data;
  };

  const changeTotalAPI = async (nama_biaya, total) => {
    let response = await client.put(
      `/api/order-biayapengurangan/update-total/${nama_biaya}/${order.id}`,
      {
        total: +total
      }
    );
    return response.data;
  };

  const removeSelected = useCallback(
    async value => {
      setSelectedBiaya(prevState => {
        return prevState.filter(i => i.nama_biaya !== value);
      });

      await deleteSelectedBiaya(value);
    },
    [selectedBiaya]
  );

  const changeTotal = useCallback(
    async (nama_biaya, value) => {
      biayaRef.current.focus();
      setSelectedBiaya(prevState => {
        return prevState.map(i => {
          if (i.nama_biaya === nama_biaya) {
            return {
              ...i,
              total: +value
            };
          } else {
            return i;
          }
        });
      });
      await changeTotalAPI(nama_biaya, +value);
    },
    [biayaRef]
  );

  const grandTotal = useMemo(() => {
    dispatch({
      type: 'GRAND_TOTAL_DISKON',
      value: selectedBiaya.reduce((a, b) => a + (b['total'] || 0), 0)
    });
    return selectedBiaya.reduce((a, b) => a + (b['total'] || 0), 0);
  }, [selectedBiaya]);

  useEffect(() => {
    fetchSelectedBiaya();
  }, [fetchSelectedBiaya]);

  return (
    <>
      <ModalBiaya
        order={order.id}
        open={openModalAddBiaya}
        onSubmit={onSelectedBiaya}
        handleClose={handleCloseModal}
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          title="Pengurangan Biaya / Diskon"
          action={
            <IconButton onClick={() => setOpenModalAddBiaya(true)}>
              <AddIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Biaya</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedBiaya.map(item => (
                    <TableRow>
                      <TableCell>{item.nama_biaya}</TableCell>
                      <TableCell>
                        <TextField
                          ref={biayaRef}
                          type="number"
                          //   error={item.defaultSelect > item.total_stok}
                          //   helperText={
                          //     item.defaultSelect > item.total_stok
                          //       ? 'Stok menipis bro inget...!!'
                          //       : ''
                          //   }
                          min={0}
                          value={item.total}
                          onChange={event =>
                            changeTotal(item.nama_biaya, event.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => removeSelected(item.nama_biaya)}>
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

OrderDiskonPengurangan.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderDiskonPengurangan;
