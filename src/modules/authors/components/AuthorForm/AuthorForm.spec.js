import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../globals/mocks/';

import Form from '../../../common/components/Form/Form';
import InputField from '../../../common/components/InputField/InputField';

import AuthorForm from './AuthorForm';

const defaultProps = Object.freeze({
  author: Object.create(authorMocks[0]),
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
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorForm {...props} />);
}

describe('AuthorForm', () => {
  let component;

  describe('with "author" populated', () => {
    test('matches the snapshot', () => {
      component = getComponent();
      expect(component).toMatchSnapshot();
    });

    test('renders correctly', () => {
      component = getComponent();
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(2);
    });
  });
});