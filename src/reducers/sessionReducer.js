import * as actionTypes from 'actions';

const initialState = {
  loggedIn: true,
  user: {
    first_name: 'Fatihul',
    last_name: 'Ikhsan',
    email: 'mfatihul8902@gmail.com',
    avatar: '/images/avatars/profil.jpeg',
    bio: 'Chief Executive Officer',
    role: 'ADMIN' // ['GUEST', 'USER', 'ADMIN']
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
