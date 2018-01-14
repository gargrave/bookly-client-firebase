import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks, bookMocks } from '../../../../utils/mocks/';
import { bookModel } from '../../../../models/Book.model';

import BookEditView from './';
import BookForm from '../BookForm';
import Card from '../../../common/Card';

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

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-edit-view';
    expect(component.find(parentClass).length).toEqual(1);
  });

  it('renders one BookForm component', () => {
    component = getComponent();
    expect(component.find(BookForm).length).toEqual(1);
  });

  it('renders one Card component', () => {
    component = getComponent();
    expect(component.find(Card).length).toEqual(1);
  });
});
