const { actions, reducer } = require('../../../app/clients/website/reduxers/counter')

test('actions should return state + 1', () => {
  expect(reducer.counter(0, actions.increase())).toBe(1)
})
