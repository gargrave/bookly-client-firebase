import { ComponentBuilder } from '../../../../utils/testHelpers'

import { bookMocks } from '../../../../globals/mocks'

import BookDetailCard from './BookDetailCard/BookDetailCard'
import BookDetailView from './BookDetailView'

const defaultProps = {
  book: bookMocks[0],
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
}

const builder = new ComponentBuilder(BookDetailView, defaultProps)

describe('BookDetailView', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly', () => {
    component = builder.shallowGetComponent()
    expect(component.find(BookDetailCard)).toHaveLength(1)
  })
})
