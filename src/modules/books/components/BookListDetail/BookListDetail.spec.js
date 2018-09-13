import { bookMocks } from '../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../utils/testHelpers'

import Card from '../../../common/components/Card/Card'

import BookListDetail from './BookListDetail'

const testBook = bookMocks[0]

const defaultProps = {
  book: testBook,
  onClick: jest.fn(),
  showAuthor: true,
}

const builder = new ComponentBuilder(BookListDetail, defaultProps)

describe('BookListDetail', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  it('renders one Card', () => {
    component = builder.shallowGetComponent()
    expect(component.find(Card)).toHaveLength(1)
  })
})
