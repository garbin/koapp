import { actions } from '../../../src/client/reduxers/counter'
import {test, expect} from 'koapi/lib/test'

test('actions should create an action to increas', t => {
  const expectedAction = {
    type: 'INCREASE',
    payload: 1
  }
  expect(actions.increase()).to.deep.equal(expectedAction)
})
