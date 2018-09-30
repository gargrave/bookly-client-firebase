import { ComponentBuilder } from '../../../../../utils/testHelpers'

import CardTextList from './CardTextList'

const textList = [
  { title: '1', value: 'one' },
  { title: '2', value: 'two' },
  { title: '3', value: 'three' },
]
const defaultProps = {
  textList,
}

const builder = new ComponentBuilder(CardTextList, defaultProps)

describe('CardTextList', () => {
  let component

  describe('basic rendering', () => {
    it('renders correctly', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
      expect(component.children().length).toBe(textList.length)
    })
  })
})
