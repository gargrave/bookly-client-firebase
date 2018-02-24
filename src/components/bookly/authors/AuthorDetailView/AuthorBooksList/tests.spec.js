import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks, bookMocks } from '../../../../../utils/mocks/';

import BookList from '../../../books/BookList';

import AuthorBooksList from './';

const authorName = `${authorMocks[0].firstName} ${authorMocks[0].lastName}`;
const books = bookMocks.slice(-2);

const defaultProps = Object.freeze({
  authorName,
  books,
  onBookClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorBooksList {...props} />);
}

describe('AuthorBooksList', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find(BookList)).toHaveLength(1);
  });
});
