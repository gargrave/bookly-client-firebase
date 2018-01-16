import React from 'react';
import { shallow } from 'enzyme';

import Card from './';

const defaultProps = Object.freeze({
  children: null,
  classes: [],
  header: 'Great Header',
  hoverable: true,
  onClick: jest.fn(),
  text: 'this is the text',
  title: 'Awesome Title',
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<Card {...props} />);
}

describe('Card', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-card')).toHaveLength(1);
    expect(component.find('.bookly-card__header')).toHaveLength(1);
    expect(component.find('.bookly-card__title')).toHaveLength(1);
    expect(component.find('.bookly-card__text')).toHaveLength(1);
    expect(component.find('.bookly-card--hoverable')).toHaveLength(1);
  });

  test('does not render header when prop is blank', () => {
    component = getComponent({ header: '' });
    expect(component.find('.bookly-card__header')).toHaveLength(0);
  });

  test('does not render title when prop is blank', () => {
    component = getComponent({ title: '' });
    expect(component.find('.bookly-card__title')).toHaveLength(0);
  });

  test('does not render text when prop is blank', () => {
    component = getComponent({ text: '' });
    expect(component.find('.bookly-card__text')).toHaveLength(0);
  });

  test('adds extra classes correctly', () => {
    component = getComponent({ classes: ['oneclass', 'anotherclass'] });
    expect(component.find('.bookly-oneclass.bookly-anotherclass')).toHaveLength(1);
  });

  test('does not add a hover state with "hoverable=false"', () => {
    component = getComponent({ hoverable: false });
    expect(component.find('.bookly--hoverable')).toHaveLength(0);
  });

  test('calls the "onClick" callback when clicked', () => {
    component = getComponent();
    expect(defaultProps.onClick.mock.calls.length).toBe(0);
    component.simulate('click');
    expect(defaultProps.onClick.mock.calls.length).toBe(1);
  });
});
