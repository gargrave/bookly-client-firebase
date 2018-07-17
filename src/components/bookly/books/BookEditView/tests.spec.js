import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks, bookMocks } from '../../../../globals/mocks/';
import { bookModel } from '../../../../modules/books/models';

import BookEditView from './';
import BookForm from '../BookForm';
import Card from '../../../common/Card/Card';

const testBook = bookMocks[0];

const defaultProps = Object.freeze({
  authors: authorMocks,
  book: testBook,
  disabled: false,
  errors: bookModel.emptyErrors(),
  onAuthorChange: jest.fn(),
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookEditView {...props} />);
}

describe('BookEditView', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-edit-view';
    expect(component.find(parentClass)).toHaveLength(1);
  });

  test('renders one BookForm component', () => {
    component = getComponent();
    expect(component.find(BookForm)).toHaveLength(1);
  });

  test('renders one Card component', () => {
    component = getComponent();
    expect(component.find(Card)).toHaveLength(1);
  });
});
