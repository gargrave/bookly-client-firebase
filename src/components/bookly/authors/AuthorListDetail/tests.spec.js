import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import AuthorListDetail from './';
import Card from '../../../common/Card';

describe('AuthorListDetail', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      author: Object.create(authorMocks[0]),
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
