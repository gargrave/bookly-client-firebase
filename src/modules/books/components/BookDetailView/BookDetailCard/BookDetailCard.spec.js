import React from 'react';
import { shallow } from 'enzyme';

import { bookMocks } from '../../../../../globals/mocks/';

import Card from '../../../../common/components/Card/Card';

import BookDetailCard from './BookDetailCard';

const defaultProps = Object.freeze({
  book: Object.create(bookMocks[0]),
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookDetailCard {...props} />);
}

describe('BookDetailCard', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find(Card)).toHaveLength(1);
  });
});
