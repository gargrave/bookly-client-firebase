import { ComponentBuilder } from '../../../../utils/testHelpers';

import VerifyAccountNotice from './VerifyAccountNotice';

const defaultProps = {
  emailHasBeenSent: false,
  onSendLinkClick: jest.fn(),
};

const builder = new ComponentBuilder(
  VerifyAccountNotice, defaultProps,
);

describe('VerifyAccountNotice', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  // describe('basic rendering', () => {
  //   it('renders correctly', () => {
  //     component = builder.mountComponent();
  //     expect(component.find('.bookly-detail-card')).toHaveLength(1);
  //     expect(component.find('.bookly-verify-account-card')).toHaveLength(1);
  //   });

  //   it('should not be hoverable', () => {
  //     component = builder.mountComponent();
  //     expect(component.find('.bookly-detail-card--hoverable')).toHaveLength(0);
  //   });
  // });

  // describe('state-based rendering', () => {
  //   it('should render a warning button if email has not been sent', () => {
  //     component = builder.mountComponent();
  //     expect(component.find('button.bookly-button.button-warning').length).toEqual(1);
  //     expect(component.find('button.bookly-button.button-info').length).toEqual(0);
  //   });

  //   it('should render an info button if email has been sent', () => {
  //     component = builder.mountComponent({ emailHasBeenSent: true });
  //     expect(component.find('button.bookly-button.button-info').length).toEqual(1);
  //     expect(component.find('button.bookly-button.button-warning').length).toEqual(0);
  //   });
  // });
});
