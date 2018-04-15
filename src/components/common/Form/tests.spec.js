import React from 'react';
import { shallow } from 'enzyme';

import Alert from '../Alert/Alert';
import Button from '../Button';
import Form from './';

const defaultProps = Object.freeze({
  cancelBtnText: 'Cancel',
  children: [],
  classes: [],
  disabled: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  submitBtnText: 'Submit',
  submitDisabled: false,
  topLevelError: '',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<Form {...props} />);
}

describe('Form', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    test('renders  correctly', () => {
      component = getComponent();
      expect(component.find(Alert)).toHaveLength(0);
      expect(component.find(Button)).toHaveLength(2);
    });

    test('does not render "cancel" button if prop is empty', () => {
      component = getComponent({ onCancel: null });
      expect(component.find(Button)).toHaveLength(1);
    });

    test('renders an Alert if the prop is present', () => {
      component = getComponent({ topLevelError: 'OMFG' });
      expect(component.find(Alert)).toHaveLength(1);
    });
  });
});
