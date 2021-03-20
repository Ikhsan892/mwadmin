/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { useSelector } from 'react-redux';
import { NotificationsPopover } from 'components';
import { logout } from 'actions';
import { useCookies } from 'react-cookie'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  logo: {
    height: 36,
    width: 'auto',
    filter: 'invert(100%)'
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { isMaintain } = useSelector(state => state.maintained);
  const [ cookies, setCookies ,removeCookie ] = useCookies(['_TuVbwpW'])

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then(response => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    removeCookie('_TuVbwpW')
    history.push('/auth/login');
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/mwlogo.png"
            className={classes.logo}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {isMaintain ? (
            ''
          ) : (
            <IconButton
              className={classes.notificationsButton}
              color="inherit"
              onClick={handleNotificationsOpen}
              ref={notificationsRef}>
              <Badge
                badgeContent={notifications.length}
                classes={{ badge: classes.notificationsBadge }}
                variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
