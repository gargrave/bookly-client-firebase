import { authorMocks } from '../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../utils/testHelpers'

import Card from '../../../common/components/Card/Card'

import AuthorListDetail from './AuthorListDetail'

const defaultProps = {
  author: { ...authorMocks[0] },
  onClick: jest.fn(),
}

const builder = new ComponentBuilder(AuthorListDetail, defaultProps)

describe('AuthorListDetail', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  it('renders correctly', () => {
    component = builder.shallowGetComponent()
    const element = component.find(Card)
    expect(element).toHaveLength(1)
  })
})
