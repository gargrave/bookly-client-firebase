import React from 'react';
import { shallow } from 'enzyme';

import InputField from './InputField';

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

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('label display', () => {
    test('renders the correct label text', () => {
      const props = { label: 'test_label' };
      component = getComponent(props);
      const label = component.find('label');
      expect(label).toHaveLength(1);
      expect(label.text()).toMatch(new RegExp(props.label));
    });

    test('does not render a label if prop is empty', () => {
      component = getComponent({ label: '' });
      expect(component.find('label')).toHaveLength(0);
    });
  });

  describe('error display', () => {
    const errClass = '.bookly-input-field__error';

    test('renders the error correctly when one is present', () => {
      const errMsg = 'error_message';
      component = getComponent({ error: errMsg });
      const err = component.find(errClass);
      expect(err).toHaveLength(1);
      expect(err.text()).toMatch(new RegExp(errMsg));
    });

    test('does not render an error if prop is empty', () => {
      component = getComponent();
      expect(component.find(errClass)).toHaveLength(0);
    });
  });

  describe('"text" type input field', () => {
    test('renders a text input correctly', () => {
      component = getComponent();
      expect(component.find('input[type="email"]')).toHaveLength(0);
      expect(component.find('input[type="text"]')).toHaveLength(1);
      expect(component.find('input[type="password"]')).toHaveLength(0);
    });
  });

  describe('"password" type input field', () => {
    test('renders a password input correctly', () => {
      component = getComponent({ type: 'password' });
      expect(component.find('input[type="email"]')).toHaveLength(0);
      expect(component.find('input[type="text"]')).toHaveLength(0);
      expect(component.find('input[type="password"]')).toHaveLength(1);
    });
  });

  describe('"email" type input field', () => {
    test('renders an email input correctly', () => {
      component = getComponent({ type: 'email' });
      expect(component.find('input[type="email"]')).toHaveLength(1);
      expect(component.find('input[type="password"]')).toHaveLength(0);
      expect(component.find('input[type="text"]')).toHaveLength(0);
    });
  });
});
