import { fetchJobs } from '../utils/jobs_api_util';

export const RECEIVE_JOBS = 'RECEIVE_JOBS';

export const requestJobs = (query) => dispatch =>(
  fetchJobs(query).then(
    jobs => dispatch(receiveJob(jobs))
  )
);

export const receiveJobs = (jobs) => {
  type: RECEIVE_JOBS,
  jobs
}
