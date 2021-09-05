import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import useRouter from 'utils/useRouter';
import Error401 from 'views/Error401';

// Example of user roles:   ['GUEST', 'USER', 'ADMIN'];

const AuthGuard = props => {
  const { children } = props;
  const dispatch = useDispatch();
  const [isGranted, setIsGranted] = useState(false);
  const session = useSelector(state => state.session);
  const router = useRouter();
  const location = useLocation();
  const [cookies] = useCookies(['token']);

  const handleGranted = useCallback(() => {
    if (!cookies._TuVbwpW || cookies._TuVbwpW === undefined) {
      router.history.push('/auth/login');
    }

    let granted = ['/overview', '/invoices', '/settings/general'];

    if (!granted.includes(location.pathname)) {
      if (
        session.user.menu.filter(i => matchPath(location.pathname, i.link))
          .length < 1
      ) {
        return <Error401 />;
      } else {
        return children;
      }
    } else {
      return children;
    }
  }, [session.user.menu, location.pathname]);

  return <Fragment>{handleGranted()}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
