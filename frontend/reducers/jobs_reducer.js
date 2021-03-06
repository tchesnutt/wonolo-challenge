import { merge } from 'lodash';
import { RECEIVE_JOBS } from '../actions/job_actions';

const JobsReducer = ( state = {}, action ) => {
  Object.freeze( state );
  switch ( action.type ) {
  case RECEIVE_JOBS:
    return merge({}, action.jobs)
  default:
    return state;
  }
};

export default JobsReducer;
