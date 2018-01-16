import React from 'react';
import { shallow } from 'enzyme';

import { userMocks } from '../../../../utils/mocks/';

import Card from '../../../common/Card';

import AccountDetailView from './';

const defaultProps = Object.freeze({
  onLogoutClick: jest.fn(),
  user: Object.create(userMocks[0]),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AccountDetailView {...props} />);
}

describe('AccountDetailView', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-account-detail-view')).toHaveLength(1);
    expect(component.find(Card)).toHaveLength(1);
  });
});
