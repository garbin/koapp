const { actions, reducer } = require('../../../app/client/reduxers/counter')

test('actions should return state + 1', () => {
  expect(reducer.counter(0, actions.increase())).toBe(1)
})
