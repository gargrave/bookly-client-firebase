import React from 'react';
import { shallow } from 'enzyme';

import { bookBucketMocks } from '../../../../utils/mocks/';

import BookBucketBookList from './BookBucketBookList/';
import BookBucketHeader from './BookBucketHeader/';
import BookListBucket from './';

const defaultProps = Object.freeze({
  bucket: bookBucketMocks[0],
  onBookClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookListBucket {...props} />);
}

describe('BookListBucket', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-bucket';
    expect(component.find(parentClass)).toHaveLength(1);
  });

  it ('renders one BookBucketHeader', () => {
    expect(component.find(BookBucketHeader)).toHaveLength(1);
  });

  it ('renders one BookBucketBookList', () => {
    expect(component.find(BookBucketBookList)).toHaveLength(1);
  });
});
