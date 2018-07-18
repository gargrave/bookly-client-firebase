import React from 'react';
import { shallow } from 'enzyme';

import Form from '../../../../modules/common/components/Form/Form';
import InputField from '../../../../modules/common/components/InputField/InputField';

import LoginForm from './LoginForm';

const defaultProps = Object.freeze({
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
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<LoginForm {...props} />);
}

describe('LoginForm', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    test('renders correctly', () => {
      component = getComponent();
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(2);
    });
  });
});
