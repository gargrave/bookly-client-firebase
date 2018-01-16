import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import Card from '../../../common/Card';

import AuthorDetailView from './';

const defaultProps = Object.freeze({
  author: Object.create(authorMocks[0]),
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

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-author-detail-view').length).toEqual(1);
    expect(component.find(Card).length).toEqual(1);
  });
});
