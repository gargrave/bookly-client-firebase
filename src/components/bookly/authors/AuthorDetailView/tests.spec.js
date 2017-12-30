import React from 'react';
import { shallow } from 'enzyme';

import { authorsMockData } from '../../../..//utils/mocks/data/authors-mock-data';

import Card from '../../../common/Card';

import AuthorDetailView from './';

describe('AuthorDetailView', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      author: Object.create(authorsMockData[0]),
      onBackClick: jest.fn(),
      onEditClick: jest.fn(),
    };

    component = shallow(<AuthorDetailView {...props} />);
  });

  test('renders correctly', () => {
    expect(component.find('.bookly-author-detail-view').length).toEqual(1);
    expect(component.find(Card).length).toEqual(1);
  });
});
