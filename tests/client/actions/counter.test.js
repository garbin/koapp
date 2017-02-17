import { actions } from '../../../src/client/reduxers/counter'

test('actions should create an action to increas', () => {
  const expectedAction = {
    type: 'INCREASE',
    payload: 1
  }
  expect(actions.increase()).toEqual(expectedAction)
})
