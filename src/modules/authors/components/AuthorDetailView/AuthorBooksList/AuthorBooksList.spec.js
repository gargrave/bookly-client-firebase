import { ComponentBuilder } from '../../../../../utils/testHelpers'

import { authorMocks, bookMocks } from '../../../../../globals/mocks/'

import BookList from '../../../../books/components/BookList/BookList'

import AuthorBooksList from './AuthorBooksList'

const defaultProps = {
  author: authorMocks[0],
  books: bookMocks.slice(-2),
  onBookAddClick: jest.fn(),
  onBookClick: jest.fn(),
}

const builder = new ComponentBuilder(AuthorBooksList, defaultProps)

describe.only('AuthorBooksList', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly', () => {
    component = builder.shallowGetComponent()
    expect(component.find(BookList)).toHaveLength(1)
  })
})
