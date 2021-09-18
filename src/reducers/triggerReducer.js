import * as actionTypes from 'actions';

const initialState = {
  pelanggan_inserted: false,
  payment_inserted: false,
  biaya_triggered: false,
  pengiriman_triggered: false,
  role_triggered: false,
  barang_triggered: false,
  order_triggered: false,
  inventory_triggered: false,
  message_triggered: false,
  message: '',
  severity: 'success'
};

const triggerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_INFO_OPEN_TRIGGER: {
      return {
        ...state,
        message_triggered: true,
        message: action.payload.message,
        severity: action.payload.severity
      };
    }

    case actionTypes.MESSAGE_INFO_CLOSE_TRIGGER: {
      return {
        ...state,
        message_triggered: false,
        message: '',
        severity: 'success'
      };
    }

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

    case actionTypes.INVENTORY_TRIGGER: {
      return {
        ...state,
        inventory_triggered: !state.inventory_triggered
      };
    }

    default: {
      return state;
    }
  }
};

export default triggerReducer;
