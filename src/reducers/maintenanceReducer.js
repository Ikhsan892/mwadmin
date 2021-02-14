import * as actionTypes from 'actions';

let initialState = {
  isMaintain: false
};

const maintenanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_MAINTAINED:
      return {
        ...state,
        isMaintain: true
      };
    case actionTypes.ON_MAINTAIN_FALSE:
      return {
        ...state,
        isMaintain: false
      };
    default: {
      return state;
    }
  }
};

export default maintenanceReducer;
