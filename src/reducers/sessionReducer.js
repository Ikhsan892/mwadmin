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
    role: 'ADMIN', // ['GUEST', 'USER', 'ADMIN']
    menu: []
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
          first_name: action.data.firstName,
          last_name: action.data.lastName,
          email: action.data.email,
          avatar: action.data.avatar,
          bio: action.data.role ? action.data.role : '-',
          role: action.data.role.toUpperCase(),
          menu: action.data.menu
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
          role: 'GUEST',
          menu: []
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
