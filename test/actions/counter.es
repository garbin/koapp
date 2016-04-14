import expect from 'expect'
import * as actions from '../../src/actions/counter'
import * as types from '../../src/constants'

describe('actions', () => {
  it('should create an action to increase', () => {
    const expectedAction = {
      type: types.INCREASE,
      amount: 1
    }
    expect(actions.increase()).toEqual(expectedAction)
  });
})
