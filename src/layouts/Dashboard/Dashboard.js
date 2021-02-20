import React, { Suspense, useState, useEffect } from 'react';
import useRouter from 'utils/useRouter';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { AuthGuard } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar, TopBar, Interceptors } from './components';
import { userData } from 'actions';

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

const Dashboard = props => {
  const { route } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isMaintain } = useSelector(state => state.maintained);
  const [cookies, setCookies] = useCookies(['token']);
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
  const router = useRouter();
  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  useEffect(() => {
    if (cookies.token) {
      dispatch(userData(cookies.token));
    } else {
      router.history.push('/auth/login');
    }
  }, []);

  return (
    <div className={classes.root}>
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
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routesAllowed)}
            </Suspense>
          ) : (
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
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
