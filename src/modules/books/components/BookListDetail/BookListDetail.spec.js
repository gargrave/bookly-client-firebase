import { bookMocks } from '../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../utils/testHelpers'

import Card from '../../../common/components/Card/Card'

import BookListDetail from './BookListDetail'

const testBook = bookMocks[0]

const defaultProps = {
  book: testBook,
  onClick: jest.fn(),
}

const authorName = book => `${book.author.firstName} ${book.author.lastName}`

const builder = new ComponentBuilder(BookListDetail, defaultProps)

describe('BookListDetail', () => {
  let component

  beforeEach(() => {
    component = builder.shallowGetComponent()
  })

  describe('basic rendering', () => {
    test('matches the snapshot', () => {
      expect(component).toMatchSnapshot()
    })

    test('renders one Card', () => {
      expect(component.find(Card)).toHaveLength(1)
    })
  })

  describe('title text display', () => {
    test('renders the title text', () => {
      const textLines = component.find(Card.TextLine)
      const titleText = component.find({ text: defaultProps.book.title })
      expect(textLines).toHaveLength(1)
      expect(titleText).toHaveLength(1)
    })
  })

  describe('sorting string', () => {
    const sortBy = 'sort by this'

    test('does not render a sorting string if there is none', () => {
      const textLines = component.find(Card.TextLine)
      const sortByText = component.find({ text: sortBy })
      expect(textLines).toHaveLength(1)
      expect(sortByText).toHaveLength(0)
    })

    test('does not render a sorting string if there is none', () => {
      const bookWithSort = { ...testBook, sortBy }
      component = builder.shallowGetComponent({ book: bookWithSort })
      const textLines = component.find(Card.TextLine)
      const sortByText = component.find({ text: `Sorted by: ${sortBy}` })
      expect(textLines).toHaveLength(2)
      expect(sortByText).toHaveLength(1)
    })
  })

  describe('author name display', () => {
    test('does not render author name by default', () => {
      const textLines = component.find(Card.TextLine)
      const authorText = textLines.find({ text: authorName(defaultProps.book) })
      expect(textLines).toHaveLength(1)
      expect(authorText).toHaveLength(0)
    })

    test('renders the author when "showAuthor" is true', () => {
      component = builder.shallowGetComponent({ showAuthor: true })
      const textLines = component.find(Card.TextLine)
      const authorText = textLines.find({ text: authorName(defaultProps.book) })
      expect(textLines).toHaveLength(2)
      expect(authorText).toHaveLength(1)
    })
  })
})
