import { ComponentBuilder } from '../../../../../globals/utils/testHelpers';

import { bookMocks } from '../../../../../globals/mocks/';

import BookDetailCard from './BookDetailCard';
import Card from '../../../../common/Card/Card';

const defaultProps = {
  book: { ...bookMocks[0] },
  onBackClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
};

const builder = new ComponentBuilder(
  BookDetailCard,
  defaultProps,
);

describe('BookDetailCard', () => {
  let component;

  describe('the basics', () => {
    test('matches the snapshot', () => {
      component = builder.shallowGetComponent();
      expect(component).toMatchSnapshot();
    });

    test('renders correctly', () => {
      component = builder.shallowGetComponent();
      expect(component.find(Card)).toHaveLength(1);
    });
  });
});
