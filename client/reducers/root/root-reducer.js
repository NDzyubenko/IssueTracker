import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import {
  userReducer,
  issueReducer,
  statesReducer,
  typesReducer,
} from '../../reducers';

export const rootReducer = combineReducers({
  routing: routerReducer,
  states: statesReducer,
  types: typesReducer,
  users: userReducer,
  issues: issueReducer,
});
