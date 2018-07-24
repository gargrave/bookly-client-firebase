import { ComponentBuilder } from '../../../../utils/testHelpers';

import { authorMocks } from '../../../../globals/mocks';

import AuthorLink from './AuthorLink';

const defaultProps = {
  author: authorMocks[0],
};

const builder = new ComponentBuilder(
  AuthorLink, defaultProps,
);

describe('AuthorLink', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    expect(component.find('.bookly-author-link')).toHaveLength(1);
  });
});
