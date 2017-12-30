import React from 'react';
import { shallow } from 'enzyme';

import { authorsMockData } from '../../../../utils/mocks/data/authors-mock-data';

import AuthorListDetail from './';
import Card from '../../../common/Card';

describe('AuthorListDetail', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      author: Object.create(authorsMockData[0]),
      onClick: jest.fn(),
    };

    component = shallow(<AuthorListDetail {...props} />);
  });

  test('renders correctly', () => {
    const element = component.find(Card);
    expect(component).toMatchSnapshot();
    expect(element.length).toEqual(1);
  });
});
