import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/signup'
import * as types from '../../src/constants'
import expect from 'expect'; // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('async actions', () => {

  it('async submit', (done) => {

    const store = mockStore({ form: {} })

    store.dispatch(actions.submit())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual([{
          type: types.SUBMIT_DONE,
          payload: undefined
        }])
      })
      .then(done) // test passed
      .catch(done) // test failed
  })
})
