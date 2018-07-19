// @flow
import { connect } from 'react-redux';
import countBy from 'lodash/countBy';

import type { Author } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { fetchAuthors } from '../../../../store/actions';

import AuthorsListPage from '../../components/AuthorsListPage/AuthorsListPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAuthors() {
    return dispatch(fetchAuthors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AuthorsListPage, localUrls.login)
);
