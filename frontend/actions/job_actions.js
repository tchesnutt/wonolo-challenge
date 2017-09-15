import { fetchJobs } from '../utils/jobs_api_util';

export const RECEIVE_JOBS = 'RECEIVE_JOBS';

export const requestJobs = (query) => (dispatch) => {
  return fetchJobs(query).then(
    (jobs) => dispatch(receiveJobs(jobs))
  )
};

export const receiveJobs = (jobs) => ({
  type: RECEIVE_JOBS,
  jobs
})
