import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Example of user roles:   ['GUEST', 'USER', 'ADMIN'];

const AuthGuard = props => {
  const { roles, children } = props;
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const router = useRouter();
  const location = useLocation();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (!cookies.token || cookies.token === undefined) {
      router.history.push('/auth/login');
    }
    // if (!session.loggedIn || !session.user) {
    //   router.history.push('/auth/login');
    //   return;
    // }

    // if (!roles.includes(session.user.role)) {
    //   router.history.push('/errors/error-401');
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
