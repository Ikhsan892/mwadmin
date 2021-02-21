import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useRouter from 'utils/useRouter';
import client from 'utils/axios';
import { useCookies } from 'react-cookie';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Interceptors = () => {
  const [messageError, setMessageError] = useState('');
  const [messageOpen, setMessageOpen] = useState(false);
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  client.interceptors.request.use(
    function(config) {
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${cookies.token}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      if (err.response) {
        if (
          err.response?.status === 401 &&
          err.response?.data === 'Unauthorized'
        ) {
          router.history.push('/auth/login');
        } else if (
          err.response?.status === 403 &&
          (err.response?.data.message === 'token invalid' ||
            err.response?.data.message === 'jwt expired')
        ) {
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
  useEffect(() => {}, []);
  return (
    <>
      <Snackbar
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
