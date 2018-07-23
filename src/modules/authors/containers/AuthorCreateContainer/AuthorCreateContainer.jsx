// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';

import AuthorCreatePage from '../../views/AuthorCreatePage/AuthorCreatePage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AuthorCreatePage, localUrls.login)
);
