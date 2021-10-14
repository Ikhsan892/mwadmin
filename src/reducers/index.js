import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import maintenanceReducer from './maintenanceReducer';
import triggerReducer from './triggerReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  maintained: maintenanceReducer,
  trigger: triggerReducer,
  order: orderReducer
});

export default rootReducer;
