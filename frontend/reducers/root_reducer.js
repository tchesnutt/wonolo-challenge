import { combineReducers } from 'redux';
import JobsReducer from './jobs_reducer';

const RootReducer = combineReducers({
  searchResult: JobsReducer
});

export default RootReducer;
