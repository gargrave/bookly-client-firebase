import { profileMocks, userMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../globals/utils/testHelpers';

import Card from '../../../common/Card/Card';

import AccountEditView from './AccountEditView';

const defaultProps = {
  profile: { ...profileMocks[0] },
  user: { ...userMocks[0] },
};

const builder = new ComponentBuilder(
  AccountEditView,
  defaultProps,
);

describe('AccountEditView', () => {
  let component;

  test('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = builder.mountComponent();
    expect(component.find('.bookly-account-edit-view')).toHaveLength(1);
    // expect(component.find(Card)).toHaveLength(1);
  });
});
