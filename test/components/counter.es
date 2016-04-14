import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {Counter} from '../../src/components/counter'

function setup() {
  let props = {
    actions: {
      increase: expect.createSpy(),
      decrease: expect.createSpy()
    },
    counter: 0
  };
  let renderer = TestUtils.createRenderer()
  renderer.render(<Counter {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('Counter', () => {
    it('should render correctly', () => {
      const { props, output, renderer } = setup();
      expect(output.type).toBe('div');

      output.props.children[3].props.onClick();
      expect(props.actions.increase.calls.length).toBe(1);
    })
  })
})
