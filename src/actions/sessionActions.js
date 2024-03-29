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
    await client
      .post(`/api/auth/login`, {
        email: email,
        password: password
      })
      .then(resp => {
        if (resp.status === 201) {
          dispatch({
            type: SESSION_LOGIN,
            data: resp.data.user,
            token: resp.data.access_token
          });
        } else {
          dispatch({
            type: SESSION_INVALID_CREDENTIAL,
            message: resp.data.message,
            status: resp.data.status
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
  };
};
export const userData = () => {
  return async function(dispatch) {
    dispatch({
      type: SESSION_REQUEST_LOGIN_TRUE
    });
    let res = await client.get('/api/user/detail');
    if (res && res.data && res.data.user) {
      dispatch({
        type: SESSION_LOGIN,
        data: res.data.user
      });
    }
    dispatch({
      type: SESSION_REQUEST_LOGIN_FALSE
    });
  };
};
export const logout = () => {
  return async function(dispatch) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    dispatch({
      type: SESSION_LOGOUT
    });
  };
};
