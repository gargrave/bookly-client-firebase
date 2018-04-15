import React from 'react';
import { shallow } from 'enzyme';

import { bookBucketMocks } from '../../../../../globals/mocks/';

import BookBucketBooks from './';
import BookListDetail from '../../BookListDetail/BookListDetail';

const defaultProps = Object.freeze({
  bucket: bookBucketMocks[0],
  onBookClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookBucketBooks {...props} />);
}

describe('BookBucketBooks', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-bucket__book-list';
    expect(component.find(parentClass)).toHaveLength(1);
  });

  it ('renders the correct number of BookListDetail children', () => {
    const bookCount = bookBucketMocks[0].books.length;
    expect(component.find(BookListDetail)).toHaveLength(bookCount);
  });
});
