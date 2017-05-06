import result from '../../../app/clients/default/redux/actions/result'
const { describe, expect, test } = global

describe('Test', () => {
  test('Result', () => {
    expect(result.set('key')('value')).toEqual({
      type: 'UPDATE_RESULT',
      payload: {
        name: 'key',
        result: 'value'
      }
    })
  })
})
