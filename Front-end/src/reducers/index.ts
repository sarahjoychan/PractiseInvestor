import { combineReducers } from 'redux';

import holdingsReducer from './holdingsReducer';
import authReducer from './authenticateReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
  // put all individual reducers here
  holdings: holdingsReducer,
  authenticate: authReducer,
  activities: activitiesReducer,
});
