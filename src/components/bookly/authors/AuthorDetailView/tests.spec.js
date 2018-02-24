import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks, bookMocks } from '../../../../utils/mocks/';

import AuthorDetailView from './';
import AuthorDetailCard from './AuthorDetailCard';

const defaultProps = Object.freeze({
  author: Object.create(authorMocks[0]),
  booksForAuthor: bookMocks,
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorDetailView {...props} />);
}

describe('AuthorDetailView', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-author-detail-view')).toHaveLength(1);
    expect(component.find(AuthorDetailCard)).toHaveLength(1);
  });
});
