import React from 'react';
import { shallow } from 'enzyme';

import { bookMocks } from '../../../../globals/mocks';

import BookDetailCard from './BookDetailCard';
import BookDetailView from './BookDetailView';

const defaultProps = Object.freeze({
  book: bookMocks[0],
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookDetailView {...props} />);
}

describe('BookDetailView', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-book-detail-view')).toHaveLength(1);
    expect(component.find(BookDetailCard)).toHaveLength(1);
  });
});
