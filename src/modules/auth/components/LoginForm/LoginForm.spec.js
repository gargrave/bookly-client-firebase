import { ComponentBuilder } from '../../../../utils/testHelpers';

import Form from '../../../common/components/Form/Form';
import InputField from '../../../common/components/InputField/InputField';

import LoginForm from './LoginForm';

const defaultProps = {
  disabled: false,
  errors: {
    email: '',
    password: '',
  },
  loginUser: {
    email: 'whatever@gmail.com',
    password: 'password',
  },
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  LoginForm, defaultProps,
);

describe('LoginForm', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    it('renders correctly', () => {
      component = builder.shallowGetComponent();
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(2);
    });
  });
});
