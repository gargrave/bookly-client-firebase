import React from 'react';
import { shallow } from 'enzyme';

import Alert from './';

const defaultProps = Object.freeze({
  message: 'This is the message.',
  type: 'primary',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<Alert {...props} />);
}

describe('InfoAlert', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly as an "info" alert', () => {
    component = getComponent({ type: 'info' });
    expect(component.hasClass('bookly-alert')).toBeTruthy();
    expect(component.hasClass('alert-info')).toBeTruthy();
    expect(component.text()).toEqual(defaultProps.message);
  });

  test('renders correctly as an "danger" alert', () => {
    component = getComponent({ type: 'danger' });
    expect(component.hasClass('bookly-alert')).toBeTruthy();
    expect(component.hasClass('alert-danger')).toBeTruthy();
    expect(component.text()).toEqual(defaultProps.message);
  });
});
