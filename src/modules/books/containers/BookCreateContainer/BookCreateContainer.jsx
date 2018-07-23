// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';
import { actions as authorActions } from '../../../authors/actions';

import BookCreatePage from '../../views/BookCreatePage/BookCreatePage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = (state) => ({
  authors: state.authors.data,
  preselectedAuthor: state.authors.preselectedAuthor,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  authorActions: bindActionCreators(authorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(BookCreatePage, localUrls.login)
);
