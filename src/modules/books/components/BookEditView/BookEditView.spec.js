import { authorMocks, bookMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../utils/testHelpers';
import { bookModel } from '../../models';

import BookForm from '../BookForm/BookForm';
import Card from '../../../common/components/Card/Card';

import BookEditView from './BookEditView';

const testBook = bookMocks[0];

const defaultProps = {
  authors: authorMocks,
  book: testBook,
  disabled: false,
  errors: bookModel.emptyErrors(),
  onAuthorChange: jest.fn(),
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  submitDisabled: false,
  topLevelError: '',
};

const builder = new ComponentBuilder(
  BookEditView, defaultProps,
);

describe('BookEditView', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    const parentClass = '.bookly-book-edit-view';
    expect(component.find(parentClass)).toHaveLength(1);
  });

  it('renders one BookForm component', () => {
    component = builder.shallowGetComponent();
    expect(component.find(BookForm)).toHaveLength(1);
  });

  it('renders one Card component', () => {
    component = builder.shallowGetComponent();
    expect(component.find(Card)).toHaveLength(1);
  });
});
