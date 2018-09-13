import { ComponentBuilder } from '../../../../../utils/testHelpers'

import { authorMocks } from '../../../../../globals/mocks/'

import Card from '../../../../common/components/Card/Card'

import AuthorDetailCard from './AuthorDetailCard'

const defaultProps = {
  author: { ...authorMocks[0] },
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
}

const builder = new ComponentBuilder(AuthorDetailCard, defaultProps)

describe('AuthorDetailCard', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly', () => {
    component = builder.shallowGetComponent()
    expect(component.find(Card)).toHaveLength(1)
  })
})
