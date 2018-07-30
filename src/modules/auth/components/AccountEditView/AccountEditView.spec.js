import { profileMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../utils/testHelpers';
import { profileModel } from '../../../profiles/models';

import AccountForm from '../AccountForm/AccountForm';
import Card from '../../../common/components/Card/Card';

import AccountEditView from './AccountEditView';

const defaultProps = {
  disabled: false,
  errors: profileModel.emptyErrors(),
  onCancelClick: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  profile: { ...profileMocks[0] },
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  AccountEditView, defaultProps,
);

describe('AccountEditView', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.mountComponent();
    expect(component.find(Card)).toHaveLength(1);
    expect(component.find(AccountForm)).toHaveLength(1);
  });
});
