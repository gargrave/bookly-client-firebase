import { format } from 'date-fns'

import { bookMocks } from '../../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../../utils/testHelpers'

import AuthorLink from '../../../../authors/components/AuthorLink'
import Button from '../../../../common/components/Button'
import ButtonRow from '../../../../common/components/ButtonRow/ButtonRow'
import Card from '../../../../common/components/Card/Card'

import BookDetailCard from './BookDetailCard'

const book = { ...bookMocks[bookMocks.length - 1] }
const defaultProps = {
  book,
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
}

const builder = new ComponentBuilder(BookDetailCard, defaultProps)

const dateFormat = 'MMM. DD, YYYY, HH:mm:ss'

describe('BookDetailCard', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  describe('rendering', () => {
    it('renders correctly', () => {
      component = builder.shallowGetComponent()
      expect(component.find(AuthorLink)).toHaveLength(1)
      expect(component.find(Card)).toHaveLength(1)
      expect(component.find(Card.TextList)).toHaveLength(1)
      expect(component.find(ButtonRow)).toHaveLength(1)
      expect(component.find(Button)).toHaveLength(3)
    })

    it('renders the book title in the Card header', () => {
      component = builder.shallowGetComponent()
      const cardHeader = component.find(Card.Header)
      expect(cardHeader.length).toBe(1)
      expect(cardHeader.props().text).toBe(book.title)
    })

    it('renders the correct text lines', () => {
      component = builder.shallowGetComponent()
      const textList = component.find(Card.TextList).props().textList
      expect(textList.length).toBe(3)

      const sortByText = textList.find(line => line.title === 'Sort by')
      expect(sortByText).toBeDefined()
      expect(sortByText.value).toBe(book.sortBy)

      const addedText = textList.find(line => line.title === 'Added')
      expect(addedText).toBeDefined()
      expect(addedText.value).toBe(format(book.created, dateFormat))

      const updatedText = textList.find(line => line.title === 'Added')
      expect(updatedText).toBeDefined()
      expect(updatedText.value).toBe(format(book.created, dateFormat))
    })
  })

  describe('text display', () => {
    it('renders the title in the "sort by" field if none is provided', () => {
      const overrideBook = { ...book, sortBy: '' }
      component = builder.shallowGetComponent({ book: overrideBook })
      const textList = component.find(Card.TextList).props().textList
      const sortByText = textList.find(line => line.title === 'Sort by')
      expect(sortByText.value).toBe(book.title)
    })
  })
})
