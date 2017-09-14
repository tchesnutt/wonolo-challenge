import { combineReducers } from 'redux';
import JobsReducer from './jobs_reducer';

const RootReducer = combineReducers({
  jobs: JobsReducer
});

export default RootReducer;
