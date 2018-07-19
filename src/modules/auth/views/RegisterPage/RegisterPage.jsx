// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { func, object } from 'prop-types';

import type { RegisterErrors, RegisterUser } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { buildClasses } from '../../../../globals/utils/cssHelpers';
import { registerUserHasAllFields, validateRegisterUser } from '../../../auth/validators';
import { registerUserModel } from '../../../auth/models';
import { sendAccountVerificationEmail } from '../../../../wrappers/auth';

import Card from '../../../common/components/Card/Card';
import CardList from '../../../common/components/CardList/CardList';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

type Props = {
  history: any,
  register: Function,
};

type State = {
  errors: RegisterErrors,
  formDisabled: boolean,
  registerUser: RegisterUser,
  submitDisabled: boolean,
  topLevelError: string,
};

class RegisterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: registerUserModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
      registerUser: registerUserModel.empty(),
    };

    const _this: any = this;
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
  }

  onInputChange(event: any) {
    const key = event.target.name;
    if (key in this.state.registerUser) {
      const registerUser = this.state.registerUser;
      registerUser[key] = event.target.value;
      const submitDisabled = !registerUserHasAllFields(registerUser);

      this.setState({
        registerUser,
        submitDisabled,
      });
    }
  }

  async onSubmit(event: any) {
    event.preventDefault();
    const errors = validateRegisterUser(this.state.registerUser);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: registerUserModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      }, async() => {
        try {
          const registerUser = registerUserModel.toAPI(this.state.registerUser);
          await this.props.register(registerUser);
          sendAccountVerificationEmail();
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
      registerUser,
      submitDisabled,
    } = this.state;

    return (
      <div className={buildClasses(['register-view'])}>
        <CardList>
          <Card
            header={'Create an Account'}
            hoverable={false}
          >
            <RegisterForm
              disabled={formDisabled}
              errors={errors}
              registerUser={registerUser}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitBtnText="Register"
              submitDisabled={submitDisabled}
              topLevelError={this.state.topLevelError}
            />
          </Card>
          <p className={buildClasses(['big-link'])}>
            or <Link to={localUrls.login}>sign in to your account</Link>
          </p>
        </CardList>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  history: object.isRequired,
  register: func.isRequired,
};

export default RegisterPage;
