import { bookMocks } from '../../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../../utils/testHelpers';

import Card from '../../../../common/components/Card/Card';

import BookDetailCard from './BookDetailCard';

const defaultProps = {
  book: { ...bookMocks[0] },
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
};

const builder = new ComponentBuilder(
  BookDetailCard, defaultProps,
);

describe('BookDetailCard', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    expect(component.find(Card)).toHaveLength(1);
  });
});
