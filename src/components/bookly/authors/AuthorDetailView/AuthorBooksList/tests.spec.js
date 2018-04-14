import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks, bookMocks } from '../../../../../globals/mocks/';

import BookList from '../../../books/BookList';

import AuthorBooksList from './';

const defaultProps = Object.freeze({
  author: authorMocks[0],
  books: bookMocks.slice(-2),
  onBookAddClick: jest.fn(),
  onBookClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorBooksList {...props} />);
}

describe.only('AuthorBooksList', () => {
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
