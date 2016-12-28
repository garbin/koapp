import React from 'react'
import { shallow } from 'enzyme'
import { test, expect } from 'koapi/lib/test'
import sinon from 'sinon'
import Counter from '../../../src/client/components/counter'

test('components should render correctly', t => {
  let increase = sinon.spy()
  let decrease = sinon.spy()
  let props = { actions: { increase, decrease }, counter: 0 }
  let wrapper = shallow(<Counter {...props} />)
  wrapper.find('button').at(0).simulate('click')
  expect(increase).to.have.property('callCount', 1)
})