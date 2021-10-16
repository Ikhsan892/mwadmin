import * as actionTypes from 'actions';

const initialState = {
  total_product: 0,
  total_biaya: 0,
  total_diskon: 0
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GRAND_TOTAL_PRODUCT: {
      return {
        ...state,
        total_product: action.value
      };
    }

    case actionTypes.GRAND_TOTAL_BIAYA: {
      return {
        ...state,
        total_biaya: action.value
      };
    }

    case actionTypes.GRAND_TOTAL_DISKON: {
      return {
        ...state,
        total_diskon: action.value
      };
    }

    default: {
      return state;
    }
  }
};

export default orderReducer;
