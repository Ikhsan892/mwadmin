import React, { useState } from 'react';
import { Button, Dialog, TextField } from '@material-ui/core';
import client from 'utils/axios';
import { useDispatch } from 'react-redux';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';

const ModalDP = ({ open, handleClose, order }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const updateDp = async () => {
    let update = await client.put(`/api/order/dp/${order}`, {
      dp: value
    });

    return update.data;
  };

  const setChanges = event => {
    setValue(event.target.value);
  };
  const saveData = async () => {
    try {
      await updateDp();
      handleClose();
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Success set DP',
          severity: 'success'
        }
      });
    } catch (e) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Error set DP',
          severity: 'error'
        }
      });
    }
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        Set DP
      </DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          fullWidth
          min={0}
          onChange={setChanges}
          variant="outlined"
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Close
        </Button>
        <Button onClick={saveData} color="primary" variant="contained">
          Save DP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDP;
