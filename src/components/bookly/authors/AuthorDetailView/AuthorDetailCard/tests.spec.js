import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../../utils/mocks/';

import Card from '../../../../common/Card';

import AuthorDetailCard from './';

const defaultProps = Object.freeze({
  author: Object.create(authorMocks[0]),
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorDetailCard {...props} />);
}

describe('AuthorDetailCard', () => {
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
