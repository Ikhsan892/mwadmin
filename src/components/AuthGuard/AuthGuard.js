import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import { useLocation, matchPath } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Error401 from 'views/Error401';

// Example of user roles:   ['GUEST', 'USER', 'ADMIN'];

const AuthGuard = props => {
  const { children } = props;
  const [isGranted, setIsGranted] = useState(true);
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const router = useRouter();
  const location = useLocation();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    let granted = ['/overview', '/invoices', '/settings/general'];

    if (!granted.includes(location.pathname)) {
      if (
        session.user.menu.filter(i => matchPath(location.pathname, i.link))
          .length < 1
      ) {
        setIsGranted(false);
      } else {
        setIsGranted(true);
      }
    } else {
      setIsGranted(true);
    }

    if (!cookies._TuVbwpW || cookies._TuVbwpW === undefined) {
      router.history.push('/auth/login');
    }
    // if (!_.includes(location.pathname)) {
    //   router.history.push('/errors/error-401');
    // }
    // if (!session.loggedIn || !session.user) {
    //   router.history.push('/auth/login');
    //   return;
    // }
    // if (!roles.includes(session.user.role)) {
    //   router.history.push('/errors/error-401');
    // }
  }, [router]);
  useEffect(() => {
    let granted = ['/overview', '/invoices', '/settings/general'];

    if (!granted.includes(location.pathname)) {
      if (
        session.user.menu.filter(i => matchPath(location.pathname, i.link))
          .length < 1
      ) {
        setIsGranted(false);
      } else {
        setIsGranted(true);
      }
    } else {
      setIsGranted(true);
    }

    if (!cookies._TuVbwpW || cookies._TuVbwpW === undefined) {
      router.history.push('/auth/login');
    }
  }, []);

  return <Fragment>{isGranted ? children : <Error401 />}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
