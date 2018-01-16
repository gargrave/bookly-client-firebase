import React from 'react';
import { shallow } from 'enzyme';

import { authorModel } from '../../../../models/Author.model';
import { bookModel } from '../../../../models/Book.model';

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
        book: {
          title: '',
          author: {
            id: '98hfjsdbf9s8fhdf',
            ...authorModel.empty(),
          },
        },
        disabled: false,
        errors: bookModel.emptyErrors(),
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
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(1);
    });
  });
});
