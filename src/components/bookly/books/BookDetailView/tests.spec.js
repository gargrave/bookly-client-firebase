import React from 'react';
import { shallow } from 'enzyme';

import { bookMocks } from '../../../../utils/mocks/';

import BookDetailView from './';
import Card from '../../../common/Card';

const testBook = bookMocks[0];

const defaultProps = Object.freeze({
  book: testBook,
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

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    const parentClass = '.bookly-book-detail-view';
    expect(component.find(parentClass).length).toEqual(1);
  });

  it('renders one Card component', () => {
    component = getComponent();
    expect(component.find(Card).length).toEqual(1);
  });
});
