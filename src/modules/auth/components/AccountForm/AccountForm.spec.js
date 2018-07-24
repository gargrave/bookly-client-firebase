import { profileMocks } from '../../../../globals/mocks';
import { ComponentBuilder } from '../../../../utils/testHelpers';

import Form from '../../../common/components/Form/Form';
import InputField from '../../../common/components/InputField/InputField';

import AccountForm from './AccountForm';

const defaultProps = {
  disabled: false,
  errors: {
    firstName: '',
    lastName: '',
  },
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  profile: { ...profileMocks[0] },
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  AccountForm, defaultProps,
);

describe('AccountForm', () => {
  let component;

  describe('the basics', () => {
    it('matches the snapshot', () => {
      component = builder.shallowGetComponent();
      expect(component).toMatchSnapshot();
    });

    it('renders correctly', () => {
      component = builder.mountComponent();
      expect(component.find('.bookly-account-form')).toHaveLength(1);
      expect(component.find(Form)).toHaveLength(1);
      expect(component.find(InputField)).toHaveLength(2);
    });
  });
});
