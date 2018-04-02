// @flow
import React from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import type { RegisterErrors, RegisterUser } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { register } from '../../../store/actions/authActions';
import { registerUserHasAllFields, validateRegisterUser } from '../../../globals/validations';
import { registerUserModel } from '../../../models/User.model';
import { buildClasses } from '../../../utils/cssHelpers';

import Card from '../../../components/common/Card';
import CardList from '../../../components/common/CardList';
import RegisterForm from '../../../components/bookly/account/RegisterForm';

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
  constructor(props) {
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

  onInputChange(event) {
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

  async onSubmit(event) {
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
            header={'Sign Up'}
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
        </CardList>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  history: object.isRequired,
  register: func.isRequired,
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  register(user) {
    return dispatch(register(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
