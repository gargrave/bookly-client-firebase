import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

import AuthorForm from './';

describe('AuthorForm', () => {
  let props;
  let component;

  describe('with "author" populated', () => {
    beforeEach(() => {
      props = {
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
      };

      component = shallow(<AuthorForm {...props} />);
    });

    test('renders correctly', () => {
      expect(component).toMatchSnapshot();
      expect(component.find(Form).length).toEqual(1);
      expect(component.find(InputField).length).toEqual(2);
    });
  });
});
