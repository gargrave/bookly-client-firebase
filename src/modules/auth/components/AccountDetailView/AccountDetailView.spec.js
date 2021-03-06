import { profileMocks, userMocks } from '../../../../globals/mocks/'
import { ComponentBuilder } from '../../../../utils/testHelpers'

import Card from '../../../common/components/Card/Card'

import AccountDetailView from './AccountDetailView'

const defaultProps = {
  onEditClick: jest.fn(),
  onLogoutClick: jest.fn(),
  onVerifyAccountClick: jest.fn(),
  profile: { ...profileMocks[0] },
  user: { ...userMocks[0] },
  verificationEmailHasBeenSent: false,
}

const builder = new ComponentBuilder(AccountDetailView, defaultProps)

describe('AccountDetailView', () => {
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
