import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from '@material-ui/core';
import { DialogTitle } from 'components';
import request from 'utils/axios';
import React from 'react';

const ModalTeknisi = ({ open, handleClose, ...props }) => {
  const [teknisi, setTeknisi] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState('');

  const handleSearch = value => {
    setSearchKey(value);
    if (value !== '') {
      setTeknisi(
        teknisi.filter(
          i =>
            i.firstName.toLowerCase().includes(value.toLowerCase()) ||
            i.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setTeknisi(search);
    }
  };

  const handleToggle = value => {
    const currentIndex = props.values.teknisi.indexOf(value);
    const newChecked = [...props.values.teknisi];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    props.setFieldValue('teknisi', newChecked);
  };

  React.useEffect(() => {
    const fetchTeknisi = async () => {
      let response = await request.get('/api/user');
      setTeknisi(response.data);
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
        Pilih Teknisi
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cari Teknisi"
              variant="outlined"
              name="search"
              value={searchKey}
              onChange={e => handleSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              {teknisi.length > 0 ? (
                teknisi.map(i => (
                  <ListItem key={i.id} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar ${i.id}`}
                        src={
                          i.profile_path
                            ? `http://localhost:3000/${i.profile_path}`
                            : ''
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${i.firstName} ${i.lastName}`}
                      secondary={i.role?.nama_role}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => handleToggle(i.id)}
                        checked={props.values.teknisi.indexOf(i.id) !== -1}
                      />
                    </ListItemSecondaryAction>
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

export default React.memo(ModalTeknisi);
