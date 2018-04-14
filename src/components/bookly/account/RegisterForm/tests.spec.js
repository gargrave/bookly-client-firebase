import React from 'react';
import { shallow } from 'enzyme';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

import RegisterForm from './';

const defaultProps = Object.freeze({
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
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<RegisterForm {...props} />);
}

describe('RegisterForm', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    test('renders correctly', () => {
      component = getComponent();
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(3);
    });
  });
});
