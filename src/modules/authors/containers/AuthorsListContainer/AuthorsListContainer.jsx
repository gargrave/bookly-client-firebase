// @flow
import { connect } from 'react-redux';
import countBy from 'lodash/countBy';

import type { Author } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';

import AuthorsListPage from '../../views/AuthorsListPage/AuthorsListPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { fetchAuthors } = actions;

const mapStateToProps = (state) => {
  const authorCounts = countBy(state.books.data, 'author.id');
  const authors = state.authors.data.map((author: Author) => {
    return {
      ...author,
      bookCount: authorCounts[author.id] || 0,
    };
  });

  return {
    authors,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAuthors() {
    return dispatch(fetchAuthors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AuthorsListPage, localUrls.login)
);
