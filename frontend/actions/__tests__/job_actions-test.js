import {
  RECEIVE_JOBS,
  requestJobs,
  receiveJobs
} from '../job_actions';

describe('actions', () => {
  it('should create an action to receive jobs', () => {
    const jobs = 'job job job'
    const expectedAction = {
      type: RECEIVE_JOBS,
      jobs
    }
    expect(receiveJobs(jobs)).toEqual(expectedAction)
  });
});
