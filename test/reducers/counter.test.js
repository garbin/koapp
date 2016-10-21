import { actions, reducer } from '../../src/client/reduxers/counter'
import {test, expect} from 'koapi/lib/test'

test('actions should return state + 1', t => {
  expect(reducer.counter(0, actions.increase())).equals(1);
});
