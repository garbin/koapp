const { actions } = require('../../../app/clients/website/reduxers/counter')

test('actions should create an action to increas', () => {
  const expectedAction = {
    type: 'INCREASE',
    payload: 1
  }
  expect(actions.increase()).toEqual(expectedAction)
})
