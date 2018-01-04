import React from 'react';
import { shallow } from 'enzyme';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

import LoginForm from './';

describe('LoginForm', () => {
  let props;
  let component;

  describe('basic rendering', () => {
    beforeEach(() => {
      props = {
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

      component = shallow(<LoginForm {...props} />);
    });

    test('renders correctly', () => {
      expect(component).toMatchSnapshot();
      expect(component.find(Form).length).toEqual(1);
      expect(component.find(InputField).length).toEqual(2);
    });
  });
});
