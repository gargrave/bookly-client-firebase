// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';

import AuthorCreatePage from '../../views/AuthorCreatePage/AuthorCreatePage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { createAuthor, fetchAuthors } = actions;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  createAuthor(author) {
    return dispatch(createAuthor(author));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AuthorCreatePage, localUrls.login)
);
