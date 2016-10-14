import * as actions from '../../src/actions/counter'
import * as reducers from '../../src/reducers/counter'
import {test, expect} from 'koapi/lib/test'

test('actions should return state + 1', t => {
  expect(reducers.counter(0, actions.increase())).equals(1);
});
