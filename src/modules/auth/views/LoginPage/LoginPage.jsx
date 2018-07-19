// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func, object } from 'prop-types';

import type { LoginErrors, LoginUser } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { loginHasAllFields, validateLogin } from '../../../auth/validators';
import { loginUserModel } from '../../../auth/models';
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import Card from '../../../common/components/Card/Card';
import CardList from '../../../common/components/CardList/CardList';
import LoginForm from '../../components/LoginForm/LoginForm';

import './LoginPage.css';

type Props = {
  history: any,
  login: Function,
};

type State = {
  errors: LoginErrors,
  formDisabled: boolean,
  loginUser: LoginUser,
  submitDisabled: boolean,
  topLevelError: string,
};

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: loginUserModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
      loginUser: loginUserModel.empty(),
    };

    const _this: any = this;
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
  }

  onInputChange(event: any) {
    const key = event.target.name;
    if (key in this.state.loginUser) {
      const loginUser = this.state.loginUser;
      loginUser[key] = event.target.value;
      const submitDisabled = !loginHasAllFields(loginUser);

      this.setState({
        loginUser,
        submitDisabled,
      });
    }
  }

  async onSubmit(event: any) {
    event.preventDefault();
    const errors = validateLogin(this.state.loginUser);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: loginUserModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      }, async() => {
        try {
          const loginUser = loginUserModel.toAPI(this.state.loginUser);
          await this.props.login(loginUser);
          this.props.history.push(localUrls.account);
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
    }
  }

  render() {
    const {
      errors,
      formDisabled,
      loginUser,
      submitDisabled,
    } = this.state;

    return (
      <div className={buildClasses(['login-view'])}>
        <CardList>
          <Card
            header={'Login'}
            hoverable={false}
          >
            <LoginForm
              disabled={formDisabled}
              errors={errors}
              loginUser={loginUser}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitBtnText="Login"
              submitDisabled={submitDisabled}
              topLevelError={this.state.topLevelError}
            />
            <div className={buildClasses(['password-reset-link'])}>
              <Link to={localUrls.pwResetRequest}>Forgot your password?</Link>
            </div>
          </Card>
          <p className={buildClasses(['big-link'])}>
            or <Link to={localUrls.register}>create an account</Link>
          </p>
        </CardList>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: object.isRequired,
  login: func.isRequired,
};

export default LoginPage;
