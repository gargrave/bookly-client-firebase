import React from 'react'
import { shallow } from 'enzyme'

import COMPONENT_NAME from './'

const defaultProps = Object.freeze({
  // fill this in for this specific test
})

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps)
  return shallow(<COMPONENT_NAME {...props} />)
}

describe('COMPONENT_NAME', () => {
  let component

  it('matches the snapshot', () => {
    component = getComponent()
    expect(component).toMatchSnapshot()
  })
})
