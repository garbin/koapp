import React from 'react'
import { shallow, mount } from 'enzyme'
import Counter from '../../src/components/counter'
import {test, expect} from 'koapi/lib/test'
import sinon from 'sinon'

test('components should render correctly', t => {
  let increase = sinon.spy();
  let decrease = sinon.spy();
  let props = { actions: { increase, decrease }, counter: 0 };
  let wrapper = shallow(<Counter {...props} />);
  wrapper.find('button').at(0).simulate('click');
  expect(increase).to.have.property('callCount', 1);
});
