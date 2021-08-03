import React, { Fragment, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Drawer,
  Divider,
  Paper,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import useRouter from 'utils/useRouter';
import InputIcon from '@material-ui/icons/Input';
import { useCookies } from 'react-cookie';
import { Navigation } from 'components';
import { logout } from 'actions';
import navigationConfig from './navigationConfig';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    textTransform: 'capitalize'
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  logout: {
    marginTop: 10,
    width: '100%'
  },
  iconInput: {
    marginLeft: theme.spacing(2)
  }
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;
  const [cookies, removeCookie, setCookies] = useCookies(['_TuVbwpW']);

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const handleLogout = () => {
    dispatch(logout());
    document.cookie.split(';').forEach(c => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    router.history.push('/auth/login');
  };

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        {session.loading ? (
          <Skeleton variant="circle" width={60} height={60} animation="wave" />
        ) : (
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={`http://localhost:3000/${session.user.avatar}`}
            to="/profile/1/timeline"
          />
        )}
        <Typography className={classes.name} variant="h4">
          {session.loading ? (
            <Skeleton width={100} />
          ) : (
            `${session.user.first_name} ${session.user.last_name}`
          )}
        </Typography>
        <Typography variant="body2">
          {session.loading ? <Skeleton width={100} /> : session.user.bio}
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <Hidden lgUp>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.logout}
          onClick={handleLogout}>
          Sign Out <InputIcon className={classes.iconInput} />
        </Button>
      </Hidden>

      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          <div {...rest} className={clsx(classes.root, className)}>
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square>
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
