import React from 'react';
import client from 'utils/axios';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Button } from '@material-ui/core';

const EditGaransi = ({ order, handleCloseEdit }) => {
  const [garansi, setGaransi] = React.useState('');
  const dispatch = useDispatch();
  const handleGaransi = e => setGaransi(e.target.value);

  const handleSave = async () => {
    try {
      await client.put(`/api/order/garansi/${order}`, {
        garansi: garansi
      });
      handleCloseEdit();
      dispatch({
        type: 'BARANG_TRIGGER'
      });
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Success update garansi',
          severity: 'success'
        }
      });
    } catch (e) {
      dispatch({
        type: 'MESSAGE_INFO_OPEN_TRIGGER',
        payload: {
          message: 'Error updating garansi',
          severity: 'error'
        }
      });
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Grid item>
        <TextField fullWidth value={garansi} onChange={handleGaransi} />
      </Grid>
      <Grid item>
        <Button color="primary" link onClick={handleSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditGaransi;
