// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../../auth/actions';

import RegisterPage from '../../views/RegisterPage/RegisterPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(RegisterPage, localUrls.account, false)
);
