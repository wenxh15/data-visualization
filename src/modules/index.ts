import { combineReducers } from 'redux';
import { errorReducer } from './error/errorReducer';
import { dashboardApiReducer } from './dashboardApi/dashboardApiReducer';

const rootReducer = combineReducers({
  errorReducer: errorReducer,
  dashboardApiReducer: dashboardApiReducer
});

export default rootReducer;
