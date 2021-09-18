import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useRouter from 'utils/useRouter';
import client from 'utils/axios';
import { useDispatch } from 'react-redux';
import { userData, logout } from 'actions';
import { useCookies } from 'react-cookie';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Interceptors = () => {
  const [messageError, setMessageError] = useState('');
  const [messageOpen, setMessageOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(['_TuVbwpW']);

  useEffect(() => {
    client.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        if (err.response) {
          if (err.response?.status === 401) {
            document.cookie.split(';').forEach(c => {
              document.cookie = c
                .replace(/^ +/, '')
                .replace(
                  /=.*/,
                  '=;expires=' + new Date().toUTCString() + ';path=/'
                );
            });
            dispatch(logout());
            router.history.push('/auth/login');
          } else if (
            err.response?.status === 403 &&
            (err.response?.data.message === 'token invalid' ||
              err.response?.data.message === 'jwt expired')
          ) {
            document.cookie.split(';').forEach(c => {
              document.cookie = c
                .replace(/^ +/, '')
                .replace(
                  /=.*/,
                  '=;expires=' + new Date().toUTCString() + ';path=/'
                );
            });
            dispatch(logout());
            router.history.push('/auth/login');
          } else {
            return Promise.reject(err);
          }
        } else {
          setMessageError(err.message);
          setMessageOpen(true);
          return Promise.reject(err);
        }
      }
    );
  });
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}>
        <Alert onClose={() => setMessageOpen(false)} severity="error">
          {messageError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Interceptors;
