import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Page } from 'components';
import gradients from 'utils/gradients';
import useRouter from 'utils/useRouter';
import { LoginForm } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    backgroundSize: 'contain',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login = () => {
  const classes = useStyles();
  const { messageError, token, loading, status } = useSelector(
    state => state.session
  );
  const router = useRouter();
  const [cookies, setCookies] = useCookies(['token']);
  useEffect(() => {
    if (status === 200) {
      setCookies('token', token, { path: '/' });
      router.history.push('/');
    }
  }, [status]);
  return (
    <Page className={classes.root} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            {loading ? 'Loading' : 'Masuk'}
          </Typography>
          <Typography variant="subtitle2">
            Masuk untuk mengatur semua
          </Typography>
          {messageError ? <Alert severity="error">{messageError}</Alert> : ''}
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/images/Divise-min.jpg"
          title="Cover"></CardMedia>
      </Card>
    </Page>
  );
};

export default Login;
