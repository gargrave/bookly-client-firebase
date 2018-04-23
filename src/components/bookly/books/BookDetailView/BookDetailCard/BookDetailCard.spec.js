import { ComponentBuilder } from '../../../../../globals/utils/testHelpers';

import { bookMocks } from '../../../../../globals/mocks/';

import BookDetailCard from './BookDetailCard';
import Card from '../../../../common/Card/Card';
import CardTextList from '../../../../common/Card/CardTextList/CardTextList';

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

  describe('optional dates', () => {
    it('does not render optional dates when none are present', () => {
      component = builder.shallowGetComponent();
      expect(component.find(CardTextList)).toHaveLength(1);
    });

    it('renders optional dates when one or both are present', () => {
      const book = {
        ...defaultProps.book,
        finishedOn: Date.now(),
        startedOn: Date.now(),
      };
      component = builder.shallowGetComponent({ book });
      expect(component.find(CardTextList)).toHaveLength(2);
    });
  });
});
