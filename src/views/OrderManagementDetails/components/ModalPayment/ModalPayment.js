import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField
} from '@material-ui/core';
import { DialogTitle } from 'components';
import { useDispatch } from 'react-redux';
import React from 'react';
import request from 'utils/axios';

const ModalPayment = ({ order, open, handleClose, ...props }) => {
  const [payments, setPayments] = React.useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearch = value => {
    setSearchKey(value);
    if (value !== '') {
      setPayments(
        payments.filter(i =>
          i.name_payment.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setPayments(search);
    }
  };

  const updateOrderPayment = async id => {
    try {
      await request.put(`/api/order/payment/${order}`, { payment: id });
      dispatch({
        type: 'BARANG_TRIGGER'
      });
      handleClose();
    } catch (err) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          severity: 'error',
          message: 'Error updating payment, try again'
        }
      });
    }
  };

  React.useEffect(() => {
    const fetchTeknisi = async () => {
      let response = await request.get('/api/payment-method/active');
      setPayments(response.data);
      setSearch(response.data);
    };
    fetchTeknisi();
  }, []);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        Pilih Metode Pembayaran
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cari Metode Pembayaran"
              variant="outlined"
              name="search"
              value={searchKey}
              onChange={e => handleSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              {payments.length > 0 ? (
                payments.map(i => (
                  <ListItem
                    key={i.id}
                    button
                    onClick={() => updateOrderPayment(i.id)}>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Image Payment ${i.id}`}
                        src={
                          i.image_path
                            ? `${process.env.REACT_APP_SERVER_URL}/${i.image_path}`
                            : '/images/default.png'
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText primary={i.name_payment.toUpperCase()} />
                  </ListItem>
                ))
              ) : (
                <img
                  src="/images/undraw_empty_xct9.svg"
                  style={{
                    width: 350,
                    margin: '0 auto',
                    display: 'flex',
                    height: 'auto'
                  }}
                />
              )}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          type="submit"
          onClick={handleClose}
          color="secondary"
          variant="contained">
          Pilih
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ModalPayment);
