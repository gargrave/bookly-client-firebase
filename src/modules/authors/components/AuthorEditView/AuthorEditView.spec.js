import { ComponentBuilder } from '../../../../utils/testHelpers';

import { authorMocks } from '../../../../globals/mocks/';

import AuthorForm from '../AuthorForm/AuthorForm';

import AuthorEditView from './AuthorEditView';

const defaultProps = {
  author: { ...authorMocks[0] },
  errors: {
    firstName: '',
    lastName: '',
  },
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  AuthorEditView, defaultProps,
);

describe('AuthorEditView', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders the AuthorForm component', () => {
    component = builder.shallowGetComponent();
    expect(component.find(AuthorForm)).toHaveLength(1);
  });
});
