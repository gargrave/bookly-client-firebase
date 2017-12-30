import React from 'react';
import { shallow } from 'enzyme';

import BookForm from './';
import Form from '../../../common/Form';
import InputField from '../../../common/InputField';


describe('BookForm', () => {
  let props;
  let component;

  describe('with "book" populated', () => {
    beforeEach(() => {
      props = {
        authors: [],
        book: { title: '', author: {} },
        disabled: false,
        onAuthorChange: jest.fn(),
        onCancel: jest.fn(),
        onInputChange: jest.fn(),
        onSubmit: jest.fn(),
        topLevelError: '',
      };

      component = shallow(<BookForm {...props} />);
    });

    test('renders correctly', () => {
      expect(component).toMatchSnapshot();
      expect(component.find(Form).length).toEqual(1);
      expect(component.find(InputField).length).toEqual(1);
    });
  });
});
