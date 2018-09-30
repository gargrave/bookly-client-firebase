import { ComponentBuilder } from '../../../../../utils/testHelpers'

import CardHeader from './CardHeader'

const defaultProps = {
  text: 'this is the text',
}

const builder = new ComponentBuilder(CardHeader, defaultProps)

describe('CardHeader', () => {
  let component

  describe('basic rendering', () => {
    test('renders correctly', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
      expect(component.render().text()).toBe(defaultProps.text)
    })
  })
})
