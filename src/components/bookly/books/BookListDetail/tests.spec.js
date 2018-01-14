import React from 'react';
import { shallow } from 'enzyme';

import { bookMocks } from '../../../../utils/mocks/';

import BookListDetail from './';
import Card from '../../../common/Card/';

const testBook = bookMocks[0];

const defaultProps = Object.freeze({
  book: testBook,
  onClick: jest.fn(),
  showAuthor: true,
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<BookListDetail {...props} />);
}

describe('BookListDetail', () => {
  let component;

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it ('renders one Card', () => {
    expect(component.find(Card).length).toEqual(1);
  });
});
