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

const ModalShipping = ({ order, open, handleClose, ...props }) => {
  const [shipping, setShippings] = React.useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearch = value => {
    setSearchKey(value);
    if (value !== '') {
      setShippings(
        shipping.filter(i =>
          i.nama_pengiriman.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setShippings(search);
    }
  };

  const updateShippingMethod = async id => {
    try {
      await request.put(`/api/order/shipping/${order}`, { shipping: id });
      dispatch({
        type: 'BARANG_TRIGGER'
      });
      handleClose();
    } catch (err) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          severity: 'error',
          message: 'Error updating shipping, try again'
        }
      });
    }
  };

  React.useEffect(() => {
    const fetchPengiriman = async () => {
      let response = await request.get('/api/pengiriman');
      setShippings(response.data);
      setSearch(response.data);
    };
    fetchPengiriman();
  }, []);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        Pilih Metode Pengiriman
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
              {shipping.length > 0 ? (
                shipping.map(i => (
                  <ListItem
                    key={i.id}
                    button
                    onClick={() => updateShippingMethod(i.id)}>
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
                    <ListItemText primary={i.nama_pengiriman.toUpperCase()} />
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

export default React.memo(ModalShipping);
