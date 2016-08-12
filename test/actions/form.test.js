import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/form'
import {test, expect} from 'koapi/lib/test'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


test('async actions async submit', async (t) => {
  const store = mockStore({ form: {} })
  let result = await store.dispatch(actions.submit('abc')).payload;
  expect(result).equals('abc');
})
