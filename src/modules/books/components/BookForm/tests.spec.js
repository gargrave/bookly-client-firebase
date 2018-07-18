import React from 'react';
import { shallow } from 'enzyme';

import { authorModel } from '../../../../modules/authors/models';
import { bookModel } from '../../../../modules/books/models';

import BookForm from './';
import Form from '../../../../modules/common/components/Form/Form';
import InputField from '../../../../modules/common/components/InputField/InputField';

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
