// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';
import { login } from '../../../../store/actions';

import LoginPage from '../../views/LoginPage/LoginPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  login(user) {
    return dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(LoginPage, localUrls.account, false)
);
