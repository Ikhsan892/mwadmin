import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'utils/axios';
import ImageIcon from '@material-ui/icons/Image';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import HelpIcon from '@material-ui/icons/Help';
import {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'components/ModalSubComponent/ModalSubComponent';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles(theme => ({
  image: {
    maxHeight: 350,
    objectFit: 'contain'
  },
  imageEmpty: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'contain'
  },
  avatarDetail: {
    backgroundColor: theme.palette.primary.main
  },
  cards: {
    display: 'flex',
    overflowX: 'auto'
  },
  profilePict: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  teknisiCard: {}
}));
const ModalDetail = ({ open, handleClose, id, title }) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await axios.get(`/api/barang/${id}`);
      setLoading(false);
      setData(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <LinearProgress />
        ) : (
          data && (
            <Grid container>
              <Grid item xs={12}>
                {data.image && data.image.length > 0 ? (
                  <Carousel showArrows={true}>
                    {data.image &&
                      data.image.map((item, index) => (
                        <div key={index}>
                          <img
                            src={`http://localhost:3000/${item.image_path}`}
                            alt={item.image_path}
                            className={classes.image}
                          />
                        </div>
                      ))}
                  </Carousel>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <img
                        src="/images/undraw_empty_xct9.svg"
                        alt="Empty"
                        className={classes.imageEmpty}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="overline">
                        Tidak ada gambar
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <List className={classes.root}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatarDetail}>
                            <PhoneAndroidIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={data?.nama_barang || '-'}
                          secondary="Nama Barang"
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatarDetail}>
                            <PermDeviceInformationIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={data?.merk} secondary="Merk" />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatarDetail}>
                            <PhonelinkSetupIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={data?.spesifikasi || '-'}
                          secondary="Spesifikasi"
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classes.avatarDetail}>
                            <HelpIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={data?.jenis_barang || '-'}
                          secondary="Jenis Barang"
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="overline" component="h3">
                            Teknisi
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            {data.teknisi && data.teknisi.length > 0
                              ? data.teknisi.map((item, index) => (
                                  <Grid item xs={6} md={3} key={index}>
                                    <Card className={classes.teknisiCard}>
                                      <CardContent>
                                        <Grid container spacing={2}>
                                          <Grid item>
                                            <Avatar
                                              src={`http://localhost:3000/${item.profile_path}`}
                                              className={classes.profilePict}
                                              alt={item?.firstName}
                                            />
                                          </Grid>
                                          <Grid item>
                                            <Typography component="h4">
                                              {item.firstName
                                                ? item.firstName
                                                : '-'}{' '}
                                              {item.lastName
                                                ? item.lastName
                                                : '-'}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))
                              : ''}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="overline" component="h3">
                            Keluhan
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography component="h3">
                            {data?.keluhan}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </List>
              </Grid>
            </Grid>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        {/* <Button
        type="submit"
        color="secondary"
        variant="contained">
        
      </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetail;
