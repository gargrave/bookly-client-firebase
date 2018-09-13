import { ComponentBuilder } from '../../../../utils/testHelpers'

import Card from './Card'

const defaultProps = {
  children: null,
  classes: [],
  header: 'Great Header',
  hoverable: true,
  onClick: jest.fn(),
  text: 'this is the text',
  title: 'Awesome Title',
}

const builder = new ComponentBuilder(Card, defaultProps)

describe('Card', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  // it('renders correctly', () => {
  //   component = builder.shallowGetComponent();
  //   expect(component.find('.bookly-card')).toHaveLength(1);
  //   expect(component.find('.bookly-card__header')).toHaveLength(1);
  //   expect(component.find('.bookly-card__title')).toHaveLength(1);
  //   expect(component.find('.bookly-card__text')).toHaveLength(1);
  //   expect(component.find('.bookly-card--hoverable')).toHaveLength(1);
  // });

  // it('does not render header when prop is blank', () => {
  //   component = builder.shallowGetComponent({ header: '' });
  //   expect(component.find('.bookly-card__header')).toHaveLength(0);
  // });

  // it('does not render title when prop is blank', () => {
  //   component = builder.shallowGetComponent({ title: '' });
  //   expect(component.find('.bookly-card__title')).toHaveLength(0);
  // });

  // it('does not render text when prop is blank', () => {
  //   component = builder.shallowGetComponent({ text: '' });
  //   expect(component.find('.bookly-card__text')).toHaveLength(0);
  // });

  // it('adds extra classes correctly', () => {
  //   component = builder.shallowGetComponent({ classes: ['oneclass', 'anotherclass'] });
  //   expect(component.find('.bookly-oneclass.bookly-anotherclass')).toHaveLength(1);
  // });

  // it('does not add a hover state with "hoverable=false"', () => {
  //   component = builder.shallowGetComponent({ hoverable: false });
  //   expect(component.find('.bookly--hoverable')).toHaveLength(0);
  // });

  it('calls the "onClick" callback when clicked', () => {
    component = builder.shallowGetComponent()
    expect(defaultProps.onClick.mock.calls.length).toBe(0)
    component.simulate('click')
    expect(defaultProps.onClick.mock.calls.length).toBe(1)
  })
})
