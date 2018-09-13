import { ComponentBuilder } from '../../../../utils/testHelpers'

import { authorMocks } from '../../../../globals/mocks/'

import Form from '../../../common/components/Form/Form'
import InputField from '../../../common/components/InputField/InputField'

import AuthorForm from './AuthorForm'

const defaultProps = {
  author: { ...authorMocks[0] },
  disabled: false,
  errors: {
    firstName: '',
    lastName: '',
  },
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
}

const builder = new ComponentBuilder(AuthorForm, defaultProps)

describe('AuthorForm', () => {
  let component

  describe('with "author" populated', () => {
    it('matches the snapshot', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
    })

    it('renders correctly', () => {
      component = builder.shallowGetComponent()
      expect(component.find(Form)).toHaveLength(1)
      expect(component.find(InputField)).toHaveLength(2)
    })
  })
})
