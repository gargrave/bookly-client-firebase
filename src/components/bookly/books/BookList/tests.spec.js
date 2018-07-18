import React from 'react';
import { shallow } from 'enzyme';

import { bookMocks } from '../../../../globals/mocks/';
import { filterAndBucket } from '../helpers';

import Alert from '../../../../modules/common/components/Alert/Alert';
import BookList from './';
import BookListBucket from '../BookListBucket/';
import BookListDetail from '../BookListDetail/BookListDetail';

const defaultProps = Object.freeze({
  books: bookMocks,
  filterBy: '',
  onBookClick: jest.fn(),
  groupBooksByAuthor: false,
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookList {...props} />);
}

describe('BookList', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it ('renders a flat book list when "groupBooksByAuthor" is false', () => {
    component = getComponent();
    expect(component.find(Alert)).toHaveLength(0);
    expect(component.find(BookListBucket)).toHaveLength(0);
    expect(component.find(BookListDetail)).toHaveLength(bookMocks.length);
  });

  it ('renders a bucketed book list when "groupBooksByAuthor" is true', () => {
    component = getComponent({ groupBooksByAuthor: true });
    const expected = filterAndBucket(bookMocks).length;
    expect(component.find(Alert)).toHaveLength(0);
    expect(component.find(BookListBucket)).toHaveLength(expected);
    expect(component.find(BookListDetail)).toHaveLength(0);
  });

  it ('renders just an Alert when no books are provided', () => {
    component = getComponent({ books: [] });
    expect(component.find(Alert)).toHaveLength(1);
    expect(component.find(BookListBucket)).toHaveLength(0);
    expect(component.find(BookListDetail)).toHaveLength(0);
  });
});
