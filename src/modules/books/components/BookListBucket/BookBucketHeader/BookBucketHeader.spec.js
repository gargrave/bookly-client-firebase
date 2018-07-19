import React from 'react';
import { shallow } from 'enzyme';

import { bookBucketMocks } from '../../../../../globals/mocks/';

import BookBucketHeader from './BookBucketHeader';

const defaultProps = Object.freeze({
  bucket: bookBucketMocks[0],
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookBucketHeader {...props} />);
}

describe('BookBucketHeader', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-bucket__header';
    expect(component.find(parentClass)).toHaveLength(1);

    const authorString = `${bookBucketMocks[0].author}`;
    const matched = component.find('p').text().match(new RegExp(authorString));
    expect(matched.length).toBe(1);
  });
});
