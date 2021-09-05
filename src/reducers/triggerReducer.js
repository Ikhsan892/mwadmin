import * as actionTypes from 'actions';

const initialState = {
  pelanggan_inserted: false,
  payment_inserted: false,
  biaya_triggered: false,
  pengiriman_triggered: false,
  role_triggered: false,
  barang_triggered: false,
  order_triggered: false
};

const triggerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PELANGGAN_INSERTED: {
      return {
        ...state,
        pelanggan_inserted: !state.pelanggan_inserted
      };
    }

    case actionTypes.BARANG_TRIGGER: {
      return {
        ...state,
        barang_triggered: !state.barang_triggered
      };
    }

    case actionTypes.ORDER_TRIGGER: {
      return {
        ...state,
        order_triggered: !state.order_triggered
      };
    }

    case actionTypes.ROLE_TRIGGER: {
      return {
        ...state,
        role_triggered: !state.role_triggered
      };
    }

    case actionTypes.PENGIRIMAN_TRIGGER: {
      return {
        ...state,
        pengiriman_triggered: !state.pengiriman_triggered
      };
    }

    case actionTypes.BIAYA_TRIGGER: {
      return {
        ...state,
        biaya_triggered: !state.biaya_triggered
      };
    }

    case actionTypes.PAYMENT_INSERTED: {
      return {
        ...state,
        payment_inserted: !state.payment_inserted
      };
    }
    default: {
      return state;
    }
  }
};

export default triggerReducer;
