import { bookBucketMocks } from '../../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../../utils/testHelpers'

import BookBucketHeader, {
  StyledAuthorName,
  StyledToggle,
  StyledWrapper,
} from './BookBucketHeader'

const defaultProps = {
  bucket: bookBucketMocks[0],
  expanded: false,
  onToggleExpanded: jest.fn(),
}

const builder = new ComponentBuilder(BookBucketHeader, defaultProps)

describe('BookBucketHeader', () => {
  let component

  describe('basic rendering', () => {
    it('matches the snapshot', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
    })

    it('renders correctly', () => {
      component = builder.mountComponent()
      // const authorString = `${bookBucketMocks[0].author}`
      // expect(component.find({ children: authorString })).toHaveLength(1)

      const wrapperNode = component.find(StyledWrapper)
      expect(wrapperNode).toHaveLength(1)

      const authorNode = component.find(StyledAuthorName)
      expect(authorNode).toHaveLength(1)
      let authorRE = new RegExp(defaultProps.bucket.author)
      expect(authorRE.test(authorNode.text())).toBe(true)

      const expandToggleNode = component.find(StyledToggle)
      expect(expandToggleNode.length).toBe(1)
    })
  })

  describe('expand/collapse', () => {
    it('shows "expand" when collapsed', () => {
      component = builder.mountComponent()
      expect(component.find(StyledToggle).text()).toBe('expand')
    })

    it('shows "expand" when collapsed', () => {
      component = builder.mountComponent({ expanded: true })
      expect(component.find(StyledToggle).text()).toBe('collapse')
    })

    it('calls the callback when clicked', () => {
      component = builder.mountComponent()
      expect(defaultProps.onToggleExpanded).toHaveBeenCalledTimes(0)
      component.find(StyledToggle).simulate('click')
      expect(defaultProps.onToggleExpanded).toHaveBeenCalledTimes(1)
    })
  })
})
