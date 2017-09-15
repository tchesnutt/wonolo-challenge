import JobsReducer from '../jobs_reducer';
import RootReducer from '../root_reducer';
import { createStore } from 'redux';


describe('Reducers', () => {
  describe('JobsReducer', () => {
    it('exports a function', () => {
      expect(typeof JobsReducer).toEqual('function');
    });

    it('should initialize with an empty object', () => {
      const nullState = {};
      expect(JobsReducer(undefined, {})).toEqual(nullState);
    });

    it('should return the previous state if an action is not matched', () => {
      const oldState = { 1: 'oldState' };
      const newState = JobsReducer(oldState, { type: 'unmatchedtype' });
      expect(newState).toEqual(oldState);
    })

    describe('handling the RECEIVE_JOBS action', () => {
      let action, payload;

      beforeEach(() => {
        payload = {
          1: "wowow"
        }
        action = { type: 'RECEIVE_JOBS', jobs: payload}
      });

      it('should merge a matching actions payload with the state', () => {
        const baseState = JobsReducer(undefined, {});
        const nextState = JobsReducer(baseState, action);
        expect(nextState).toEqual(action.jobs);
      });

      it('should not modify the old state', () => {
        const oldState = { 1: 'state so old' };
        JobsReducer(oldState, action);
        expect(oldState).toEqual({ 1: 'state so old'});
      });
    });
  });

  describe('RootReducer', () => {
    let testStore;

    beforeAll(() => {
      testStore = createStore(RootReducer);
    });

    it('includes the JobsReducer under the key `searchResult`', () => {
      const action = { type: 'RECEIVE_JOBS' };
      testStore.dispatch(action);
      expect(testStore.getState().searchResult).toEqual(JobsReducer(undefined, action));
    });
  });
})
