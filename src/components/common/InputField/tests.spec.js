import React from 'react';
import { shallow } from 'enzyme';

import InputField from './';

const defaultProps = Object.freeze({
  boundValue: '',
  disabled: false,
  error: '',
  label: 'Whatever',
  name: 'text',
  onInputChange: jest.fn(),
  placeholder: '',
  type: 'text',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<InputField {...props} />);
}

describe('InputField', () => {
  let component;

  describe('label display', () => {
    test('renders the correct label text', () => {
      const props = { label: 'test_label' };
      component = getComponent(props);
      const label = component.find('label');
      expect(label.length).toEqual(1);
      expect(label.text()).toMatch(new RegExp(props.label));
    });

    test('does not render a label if prop is empty', () => {
      component = getComponent({ label: '' });
      expect(component.find('label').length).toEqual(0);
    });
  });

  describe('error display', () => {
    const errClass = '.bookly-input-field__error';

    test('renders the error correctly when one is present', () => {
      const errMsg = 'error_message';
      component = getComponent({ error: errMsg });
      const err = component.find(errClass);
      expect(err.length).toEqual(1);
      expect(err.text()).toMatch(new RegExp(errMsg));
    });

    test('does not render an error if prop is empty', () => {
      component = getComponent();
      expect(component.find(errClass).length).toEqual(0);
    });
  });

  describe('"text" type input field', () => {
    test('renders a text input correctly', () => {
      component = getComponent();
      expect(component).toMatchSnapshot();
      expect(component.find('input[type="email"]').length).toEqual(0);
      expect(component.find('input[type="text"]').length).toEqual(1);
      expect(component.find('input[type="password"]').length).toEqual(0);
    });
  });

  describe('"password" type input field', () => {
    test('renders a password input correctly', () => {
      component = getComponent({ type: 'password' });
      expect(component).toMatchSnapshot();
      expect(component.find('input[type="email"]').length).toEqual(0);
      expect(component.find('input[type="text"]').length).toEqual(0);
      expect(component.find('input[type="password"]').length).toEqual(1);
    });
  });

  describe('"email" type input field', () => {
    test('renders an email input correctly', () => {
      component = getComponent({ type: 'email' });
      expect(component).toMatchSnapshot();
      expect(component.find('input[type="email"]').length).toEqual(1);
      expect(component.find('input[type="password"]').length).toEqual(0);
      expect(component.find('input[type="text"]').length).toEqual(0);
    });
  });
});
