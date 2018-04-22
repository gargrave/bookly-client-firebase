// @flow
import React from 'react';
import { connect } from 'react-redux';
import { func, object, string } from 'prop-types';

import type { PasswordReset, PasswordResetErrors } from '../../../../globals/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import {
  passwordResetHasAllFields,
  validatePasswordReset,
} from '../../../../globals/validations';
import passwordResetModel from '../../../../models/PasswordReset.model';
import { createSnackbar, markPasswordResetEmailSent } from '../../../../store/actions';
import { sendPasswordResetEmail } from '../../../../wrappers/auth';

import Card from '../../../common/Card/Card';
import CardList from '../../../common/CardList';
import PasswordResetForm from '../../../bookly/account/PasswordResetForm/PasswordResetForm';

type Props = {
  createSnackbar: Function,
  history: any,
  markPasswordResetEmailSent: Function,
  passwordResetEmailSentTo: string,
};

type State = {
  errors: PasswordResetErrors,
  formDisabled: boolean,
  model: PasswordReset,
  submitDisabled: boolean,
  topLevelError: string,
};

class PasswordResetPage extends React.Component<Props, State> {
  static propTypes = {
    createSnackbar: func.isRequired,
    history: object.isRequired,
    markPasswordResetEmailSent: func.isRequired,
    passwordResetEmailSentTo: string,
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: passwordResetModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
      model: passwordResetModel.empty(),
    };
  }

  onInputChange = (e) => {
    const key = e.target.name;
    if (key in this.state.model) {
      const model = { ...this.state.model };
      model[key] = e.target.value;
      const submitDisabled = !passwordResetHasAllFields(model);
      this.setState({ model, submitDisabled });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const model = this.state.model;
    const errors = validatePasswordReset(model);
    if (errors.hasErrors) {
      this.setState({ errors });
      return;
    }

    this.setState({
      errors: passwordResetModel.emptyErrors(),
      formDisabled: true,
      topLevelError: '',
    }, async () => {
      try {
        await sendPasswordResetEmail(model.email);
        this.props.markPasswordResetEmailSent(model.email);
      } catch (err) {
        const topLevelError = 'This was an error sending the email.';
        this.props.createSnackbar(topLevelError);
        this.setState({ topLevelError });
      } finally {
        this.setState({ formDisabled: false });
      }
    });
  }

  render() {
    const {
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
      model,
    } = this.state;

    return (
      <div className={buildClasses(['detail-view', 'password-reset-view'])}>
        <CardList>
          <Card
            header={'Request Password Reset'}
            hoverable={false}
          >
            <PasswordResetForm
              disabled={formDisabled}
              email={model.email}
              errors={errors}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitDisabled={submitDisabled}
              topLevelError={topLevelError}
            />
          </Card>
        </CardList>
      </div>
    );
  }
}

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => ({
  passwordResetEmailSentTo: state.passwordResetEmailSentTo,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  markPasswordResetEmailSent(email: string) {
    return dispatch(markPasswordResetEmailSent(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
