import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import maintenanceReducer from './maintenanceReducer';
import triggerReducer from './triggerReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  maintained: maintenanceReducer,
  trigger: triggerReducer
});

export default rootReducer;
