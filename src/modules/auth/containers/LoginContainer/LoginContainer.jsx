// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../../auth/actions';

import LoginPage from '../../views/LoginPage/LoginPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { login } = actions;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  login(user) {
    return dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(LoginPage, localUrls.account, false)
);
