import React, { Suspense, useState, useEffect } from 'react';
import useRouter from 'utils/useRouter';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { LinearProgress, Snackbar } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { AuthGuard } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar, TopBar, Interceptors } from './components';
import { userData, logout } from 'actions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = props => {
  const { route } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isMaintain } = useSelector(state => state.maintained);
  const { message_triggered, message, severity } = useSelector(
    state => state.trigger
  );
  const [cookies, setCookie, removeCookie] = useCookies(['_TuVbwpW']);
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
  const router = useRouter();
  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  useEffect(() => {
    if (cookies._TuVbwpW === 'undefined' || !cookies._TuVbwpW) {
      router.history.push('/auth/login');
    } else {
      dispatch(userData());
    }
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message_triggered}
        autoHideDuration={3000}
        onClose={() => dispatch({ type: 'MESSAGE_INFO_CLOSE_TRIGGER' })}>
        <Alert
          onClose={() => dispatch({ type: 'MESSAGE_INFO_CLOSE_TRIGGER' })}
          severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Interceptors />
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <main className={classes.content}>
          {isMaintain ? (
            <AuthGuard
            // roles={[
            //   'SUPERADMIN',
            //   'KOMISARIS',
            //   'DIREKTUR',
            //   'DIREKTUR_UTAMA',
            //   'ADMIN',
            //   'SEKRETARIS',
            //   'BENDAHARA',
            //   'TEKNISI',
            //   'KEPALA_TEKNISI'
            // ]}>
            >
              <Suspense fallback={<LinearProgress />}>
                {renderRoutes(route.routesAllowed)}
              </Suspense>
            </AuthGuard>
          ) : (
            <AuthGuard roles={['ADMIN', 'USER']}>
              <Suspense fallback={<LinearProgress />}>
                {renderRoutes(route.routes)}
              </Suspense>
            </AuthGuard>
          )}
        </main>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
