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

const ModalBiaya = ({ order, open, handleClose, onSubmit, ...props }) => {
  const dispatch = useDispatch();
  const [nama_biaya, setNama_biaya] = React.useState('');

  const handleChange = React.useCallback(value => {
    setNama_biaya(value);
  }, []);

  // const updateShippingMethod = async id => {
  //   try {
  //     await request.put(`/api/order/shipping/${order}`, { shipping: id });
  //     dispatch({
  //       type: 'BARANG_TRIGGER'
  //     });
  //     handleClose();
  //   } catch (err) {
  //     dispatch({
  //       type: 'MESSAGE_INFO_OPEN_TRIGGER',
  //       payload: {
  //         severity: 'error',
  //         message: 'Error updating shipping, try again'
  //       }
  //     });
  //   }
  // };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        Tambah Biaya
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Biaya"
              variant="outlined"
              name="nama_biaya"
              value={nama_biaya}
              onChange={e => handleChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          type="submit"
          onClick={() => onSubmit(nama_biaya)}
          color="secondary"
          variant="contained">
          Pilih
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ModalBiaya);
