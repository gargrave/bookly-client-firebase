import { ComponentBuilder } from '../../../../globals/utils/testHelpers';

import VerifyAccountNotice from './VerifyAccountNotice';

const defaultProps = {
  onSendLinkClick: jest.fn(),
};

const builder = new ComponentBuilder(
  VerifyAccountNotice,
  defaultProps,
);

describe('VerifyAccountNotice', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    it('renders correctly', () => {
      component = builder.mountComponent();
      expect(component.find('.bookly-detail-card')).toHaveLength(1);
      expect(component.find('.bookly-verify-account-card')).toHaveLength(1);
    });

    it('should not be hoverable', () => {
      component = builder.mountComponent();
      expect(component.find('.bookly-detail-card--hoverable')).toHaveLength(0);
    });
  });
});
