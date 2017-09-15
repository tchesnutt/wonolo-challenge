import { combineReducers } from 'redux';
import JobsReducer from './jobs_reducer';

const RootReducer = combineReducers({
  search_result: JobsReducer
});

export default RootReducer;
