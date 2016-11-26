import { test, expect } from 'koapi/lib/test';
import { actions } from '../../../src/client/reduxers/counter';

test('actions should create an action to increas', t => {
  const expectedAction = {
    type: 'INCREASE',
    payload: 1,
  };
  expect(actions.increase()).to.deep.equal(expectedAction);
});
