// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';
import { register } from '../../../../store/actions';

import RegisterPage from '../../views/RegisterPage/RegisterPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  register(user) {
    return dispatch(register(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(RegisterPage, localUrls.account, false)
);
