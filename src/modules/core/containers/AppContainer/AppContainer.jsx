import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../actions';
import { fetchBooks, fetchProfile } from '../../../../store/actions';
import { setLocalUserData } from '../../../../store/actions';

import App from '../../components/App/App';

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
