import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import maintenanceReducer from './maintenanceReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  maintained: maintenanceReducer
});

export default rootReducer;
