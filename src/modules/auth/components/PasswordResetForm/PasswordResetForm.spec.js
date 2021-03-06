import { ComponentBuilder } from '../../../../utils/testHelpers'
import { passwordResetModel } from '../../models'

import Form from '../../../common/components/Form/Form'
import InputField from '../../../common/components/InputField/InputField'

import PasswordResetForm from './PasswordResetForm'

const fakeEmail = 'fakeemail@email.com'
const defaultProps = {
  disabled: false,
  email: fakeEmail,
  errors: passwordResetModel.emptyErrors(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
}

const builder = new ComponentBuilder(PasswordResetForm, defaultProps)

describe('PasswordResetForm', () => {
  let component

  describe('the basics', () => {
    it('matches the snapshot', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
    })

    it('renders correctly', () => {
      component = builder.mountComponent()
      expect(component.find(Form)).toHaveLength(1)
      expect(component.find(InputField)).toHaveLength(1)
    })
  })
})
