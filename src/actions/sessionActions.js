import client from 'utils/axios';
export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_INVALID_CREDENTIAL = 'SESSION_INVALID_CREDENTIAL';
export const SESSION_REQUEST_LOGIN_TRUE = 'SESSION_REQUEST_LOGIN_TRUE';
export const SESSION_REQUEST_LOGIN_FALSE = 'SESSION_REQUEST_LOGIN_FALSE';

export const login = (email, password) => {
  return async function(dispatch) {
    dispatch({
      type: SESSION_REQUEST_LOGIN_TRUE
    });
    await client.get('/sanctum/csrf-cookie').then(resp => {
      client
        .post(`/api/user/login`, {
          email: email,
          password: password
        })
        .then(resp => {
          if (resp.status === 227) {
            dispatch({
              type: SESSION_INVALID_CREDENTIAL,
              message: resp.data.message,
              status: resp.data.status
            });
          } else {
            dispatch({
              type: SESSION_LOGIN,
              data: resp.data.user,
              token: resp.data.token
            });
          }
          dispatch({
            type: SESSION_REQUEST_LOGIN_FALSE
          });
        })
        .catch(err => {
          if (err.message) {
            alert(err.message);
            dispatch({
              type: SESSION_REQUEST_LOGIN_FALSE
            });
          }
        });
    });
    dispatch({
      type: SESSION_REQUEST_LOGIN_FALSE
    });
  };
};
export const userData = token => {
  return async function(dispatch) {
    dispatch({
      type: SESSION_REQUEST_LOGIN_TRUE
    });
    await client
      .get('/api/user/detail', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(resp => {
        dispatch({
          type: SESSION_LOGIN,
          data: resp.data.user,
          token: token
        });
      });
    dispatch({
      type: SESSION_REQUEST_LOGIN_FALSE
    });
  };
};
export const logout = () => dispatch =>
  dispatch({
    type: SESSION_LOGOUT
  });
