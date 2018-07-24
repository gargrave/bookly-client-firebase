import { ComponentBuilder } from '../../../../utils/testHelpers';

import Form from '../../../common/components/Form/Form';
import InputField from '../../../common/components/InputField/InputField';

import RegisterForm from './RegisterForm';

const defaultProps = {
  disabled: false,
  errors: {
    email: '',
    password: '',
    passwordConfirm: '',
  },
  registerUser: {
    email: 'whatever@gmail.com',
    password: 'password',
    passwordConfirm: 'password',
  },
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  RegisterForm, defaultProps,
);

describe('RegisterForm', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    it('renders correctly', () => {
      component = builder.shallowGetComponent();
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(3);
    });
  });
});
