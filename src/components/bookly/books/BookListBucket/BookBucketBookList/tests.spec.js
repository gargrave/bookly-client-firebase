import React from 'react';
import { shallow } from 'enzyme';

import { bookBucketMocks } from '../../../../../utils/mocks/';

import BookBucketBooks from './';
import BookListDetail from '../../BookListDetail/';

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

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-bucket__book-list';
    expect(component.find(parentClass).length).toEqual(1);
  });

  it ('renders the correct number of BookListDetail children', () => {
    const bookCount = bookBucketMocks[0].books.length;
    expect(component.find(BookListDetail).length).toEqual(bookCount);
  });
});
