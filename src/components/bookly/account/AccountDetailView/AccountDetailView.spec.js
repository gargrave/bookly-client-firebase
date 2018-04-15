import { userMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../globals/utils/testHelpers';

import Card from '../../../common/Card/Card';

import AccountDetailView from './AccountDetailView';

const defaultProps = {
  onLogoutClick: jest.fn(),
  onVerifyAccountClick: jest.fn(),
  user: Object.create(userMocks[0]),
  verificationEmailHasBeenSent: false,
};

const builder = new ComponentBuilder(
  AccountDetailView,
  defaultProps,
);

describe('AccountDetailView', () => {
  let component;

  test('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = builder.shallowGetComponent();
    expect(component.find('.bookly-account-detail-view')).toHaveLength(1);
    expect(component.find(Card)).toHaveLength(1);
  });
});
