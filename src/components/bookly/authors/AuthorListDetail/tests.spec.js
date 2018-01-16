import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import AuthorListDetail from './';
import Card from '../../../common/Card';

const defaultProps = Object.freeze({
  author: Object.create(authorMocks[0]),
  onClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorListDetail {...props} />);
}

describe('AuthorListDetail', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    const element = component.find(Card);
    expect(element).toHaveLength(1);
  });
});
