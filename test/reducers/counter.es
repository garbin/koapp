import expect from 'expect'
import * as actions from '../../src/actions/counter'
import * as types from '../../src/constants/'
import * as reducers from '../../src/reducers/counter'

describe('actions', () => {
  it('should return state + 1', () => {
    expect(reducers.counter(0, actions.increase())).toEqual(1);
  });
})
