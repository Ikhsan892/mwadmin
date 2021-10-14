import * as actionTypes from 'actions';

const initialState = {
  total_product: 0
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GRAND_TOTAL_PRODUCT: {
      return {
        ...state,
        total_product: action.value
      };
    }

    default: {
      return state;
    }
  }
};

export default orderReducer;
