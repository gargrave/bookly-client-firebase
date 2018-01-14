import React from 'react';
import { shallow } from 'enzyme';

import { bookBucketMocks } from '../../../../../utils/mocks/';

import BookBucketHeader from './';

const defaultProps = Object.freeze({
  bucket: bookBucketMocks[0],
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookBucketHeader {...props} />);
}

describe('BookBucketHeader', () => {
  let component;

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    const authorString = `${bookBucketMocks[0].author}`;
    const matched = component.find('p').text().match(new RegExp(authorString));
    expect(matched.length).toBe(1);
  });
});
