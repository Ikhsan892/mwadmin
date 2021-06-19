import * as actionTypes from 'actions';

const initialState = {
  pelanggan_inserted: false
};

const triggerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PELANGGAN_INSERTED: {
      return {
        ...state,
        pelanggan_inserted: !state.pelanggan_inserted
      };
    }
    default: {
      return state;
    }
  }
};

export default triggerReducer;
