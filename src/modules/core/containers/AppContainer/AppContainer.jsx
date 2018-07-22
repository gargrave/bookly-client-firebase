import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../actions';
import { actions as authActions } from '../../../auth/actions';
import { actions as bookActions } from '../../../books/actions';
import { actions as profileActions } from '../../../profiles/actions';

import App from '../../components/App/App';

const { setLocalUserData } = authActions;
const { fetchBooks } = bookActions;
const { fetchProfile } = profileActions;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  fetchBooks() {
    return dispatch(fetchBooks());
  },

  fetchProfile() {
    return dispatch(fetchProfile());
  },

  setLocalUserData(user) {
    return dispatch(setLocalUserData(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
