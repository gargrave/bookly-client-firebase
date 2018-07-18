import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

const defaultProps = Object.freeze({
  onClick: jest.fn(),
  text: 'ButtonText',
  type: 'success',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<Button {...props} />);
}

describe('Button', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders as a "success" button', () => {
    component = getComponent();
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-success')).toBeTruthy();
  });

  test('renders as a "secondary" button', () => {
    component = getComponent({ type: 'secondary' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-secondary')).toBeTruthy();
  });

  test('renders as a "info" button', () => {
    component = getComponent({ type: 'info' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-info')).toBeTruthy();
  });

  test('renders as a "warning" button', () => {
    component = getComponent({ type: 'warning' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-warning')).toBeTruthy();
  });

  test('renders as a "danger" button', () => {
    component = getComponent({ type: 'danger' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-danger')).toBeTruthy();
  });

  test('renders as a "light" button', () => {
    component = getComponent({ type: 'light' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-light')).toBeTruthy();
  });

  test('renders as a "dark" button', () => {
    component = getComponent({ type: 'dark' });
    expect(component.hasClass('bookly-button')).toBeTruthy();
    expect(component.hasClass('button-dark')).toBeTruthy();
  });

  test('renders the correct text', () => {
    component = getComponent();
    expect(component.text()).toEqual('ButtonText');
  });

  test('calls the callback as expected', () => {
    const onClick = jest.fn();
    component = getComponent({ onClick });
    expect(onClick.mock.calls.length).toBe(0);
    component.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
