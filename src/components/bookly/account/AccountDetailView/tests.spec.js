import React from 'react';
import { shallow } from 'enzyme';

import { userMocks } from '../../../../utils/mocks/';

import Card from '../../../common/Card';

import AccountDetailView from './';

describe('AccountDetailView', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      onLogoutClick: jest.fn(),
      user: Object.create(userMocks[0]),
    };

    component = shallow(<AccountDetailView {...props} />);
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('.bookly-account-detail-view').length).toEqual(1);
    expect(component.find(Card).length).toEqual(1);
  });
});
