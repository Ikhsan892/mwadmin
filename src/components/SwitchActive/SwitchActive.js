import { Switch } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import client from 'utils/axios';

const SwitchActive = ({ ...props }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    await client.put(props.url, {
      id: props.id
    });
    dispatch({ type: props.trigger });
  };

  return (
    <Switch
      checked={props.active}
      color="primary"
      onChange={handleChange}
      name="aktif"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default SwitchActive;
