// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';
import { createAuthor, fetchAuthors } from '../../../../store/actions';

import AuthorCreatePage from '../../components/AuthorCreatePage/AuthorCreatePage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

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
