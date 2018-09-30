import { ComponentBuilder } from '../../../../../utils/testHelpers'

import CardTextLine from './CardTextLine'

const defaultProps = {
  text: 'this is the text',
  type: 'text',
}

const builder = new ComponentBuilder(CardTextLine, defaultProps)

describe('CardTextLine', () => {
  let component

  describe('basic rendering', () => {
    test('renders correct', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
      expect(component.render().text()).toBe(defaultProps.text)
    })
  })

  describe('conditional classes', () => {
    test('correctly applies the "text" class', () => {
      component = builder.shallowGetComponent()
      expect(component.find('.text').length).toBe(1)
      expect(component.find('.subtext').length).toBe(0)
      expect(component.find('.title').length).toBe(0)
    })

    test('correctly applies the "subtext" class', () => {
      component = builder.shallowGetComponent({ type: 'subtext' })
      expect(component.find('.text').length).toBe(0)
      expect(component.find('.subtext').length).toBe(1)
      expect(component.find('.title').length).toBe(0)
    })

    test('correctly applies the "title" class', () => {
      component = builder.shallowGetComponent({ type: 'title' })
      expect(component.find('.text').length).toBe(0)
      expect(component.find('.subtext').length).toBe(0)
      expect(component.find('.title').length).toBe(1)
    })
  })
})
