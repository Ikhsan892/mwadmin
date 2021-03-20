import * as actionTypes from 'actions';

const initialState = {
  loggedIn: false,
  messageError: '',
  loading: false,
  token: '',
  status: 0,
  user: {
    first_name: '--',
    last_name: '--',
    email: '---',
    avatar: '/images/avatars/profil.jpeg',
    bio: '---',
    role: 'ADMIN' // ['GUEST', 'USER', 'ADMIN']
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...state,
        loggedIn: true,
        status: 200,
        token: action.token,
        user: {
          first_name: action.data.name,
          last_name: '--',
          email: action.data.email,
          avatar: action.data.profile_image,
          bio: action.data.jabatan ? action.data.jabatan : '-',
          role: action.data.role.toUpperCase()
        }
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        token: '',
        status: 0,
        user: {
          role: 'GUEST'
        }
      };
    }

    case actionTypes.SESSION_INVALID_CREDENTIAL: {
      return {
        ...state,
        loggedIn: false,
        status: action.status,
        messageError: action.message
      };
    }
    case actionTypes.SESSION_REQUEST_LOGIN_FALSE: {
      return {
        ...state,
        loading: false
      };
    }
    case actionTypes.SESSION_REQUEST_LOGIN_TRUE: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
