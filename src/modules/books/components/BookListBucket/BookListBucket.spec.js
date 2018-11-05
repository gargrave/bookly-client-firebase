import { bookBucketMocks } from '../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../utils/testHelpers'

import BookBucketBookList from './BookBucketBookList/BookBucketBookList'
import BookBucketHeader from './BookBucketHeader/BookBucketHeader'

import BookListBucket from './BookListBucket'

const defaultProps = {
  bucket: bookBucketMocks[0],
  onBookClick: jest.fn(),
}

const builder = new ComponentBuilder(BookListBucket, defaultProps)

describe('BookListBucket', () => {
  let component

  beforeEach(() => {
    component = builder.shallowGetComponent()
  })

  describe('basic rendering', () => {
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot()
    })

    it('renders one BookBucketHeader', () => {
      expect(component.find(BookBucketHeader)).toHaveLength(1)
    })

    it('renders one BookBucketBookList when expanded', () => {
      component.instance().setState({ expanded: true })
      expect(component.find(BookBucketBookList)).toHaveLength(1)
    })

    it('renders zero BookBucketBookLists when collapsed', () => {
      component.instance().setState({ expanded: false })
      expect(component.find(BookBucketBookList)).toHaveLength(0)
    })
  })

  describe('state', () => {
    it('sets the correct default state', () => {
      const state = component.state()
      expect(state.expanded).toBe(true)
    })
  })

  describe('actions', () => {
    describe('handleToggleExpanded', () => {
      it('toggles the value of "expanded" in state', () => {
        let expanded = component.state().expanded
        component.instance().handleToggleExpanded()
        expect(component.state().expanded).toBe(!expanded)
        component.instance().handleToggleExpanded()
        expect(component.state().expanded).toBe(expanded)
      })
    })
  })
})
