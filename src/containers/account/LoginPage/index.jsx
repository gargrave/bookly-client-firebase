// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import type { User } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { login } from '../../../store/actions/authActions';
import { parseError } from '../../../globals/errors';
import { validateLogin } from '../../../globals/validations/';
import { userModel } from '../../../models/User.model';

import Card from '../../../components/common/Card';
import LoginForm from '../../../components/bookly/account/LoginForm';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  history: any,
  login: Function,
};

type State = {
  errors: User,
  topLevelError: string,
  user: User,
};

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: userModel.emptyErrors(),
      topLevelError: '',
        user: {
          email: '',
          password: '',
        },
    };

    const _this: any = this;
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.user) {
      const user = this.state.user;
      user[key] = event.target.value;

      this.setState({
        user,
      });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({
      topLevelError: '',
    }, async () => {
      const errors = validateLogin(this.state.user);
      this.setState({
        errors,
      });
      if (!errors.found) {
        try {
          await this.props.login(this.state.user);
          this.props.history.push(localUrls.account);
        } catch (err) {
          this.setState({
            topLevelError: parseError(err),
          });
        }
      }
    });
  }

  render() {
    const {
      errors,
    } = this.state;

    return (
      <Card
        classes={['card--top-margin-med']}
        header={"Login"}
        hoverable={false}
      >
        <LoginForm
          errors={errors}
          onCancel={() => null}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          submitBtnText="Login"
          topLevelError={this.state.topLevelError}
          user={this.state.user}
        />
      </Card>
    );
  }
}

LoginPage.propTypes = {
  history: object.isRequired,
  login: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login(user) {
    return dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(LoginPage, localUrls.account, false));
