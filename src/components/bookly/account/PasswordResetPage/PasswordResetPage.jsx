// @flow
import React, { Fragment } from 'react';
import { func, string } from 'prop-types';

import type { PasswordReset, PasswordResetErrors } from '../../../../modules/auth/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import { passwordResetHasAllFields, validatePasswordReset } from '../../../../modules/auth/validators';
import { passwordResetModel } from '../../../../modules/auth/models';
import { sendPasswordResetEmail } from '../../../../wrappers/auth';

import Card from '../../../common/Card/Card';
import CardSpacer from '../../../common/Card/CardSpacer/CardSpacer';
import CardList from '../../../common/CardList';
import CardTextLine from '../../../common/Card/CardTextLine/CardTextLine';
import PasswordResetForm from './PasswordResetForm/PasswordResetForm';

type Props = {
  createSnackbar: Function,
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
    markPasswordResetEmailSent: func.isRequired,
    passwordResetEmailSentTo: string,
  }

  constructor(props: any) {
    super(props);

    this.state = {
      errors: passwordResetModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
      model: passwordResetModel.empty(),
    };
  }

  onInputChange = (e: any) => {
    const key = e.target.name;
    if (key in this.state.model) {
      const model = { ...this.state.model };
      model[key] = e.target.value;
      const submitDisabled = !passwordResetHasAllFields(model);
      this.setState({ model, submitDisabled });
    }
  }

  onSubmit = async (e: any) => {
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
        console.log({ err });
        const topLevelError = 'This was an error sending the email.';
        this.props.createSnackbar(topLevelError);
        this.setState({ topLevelError });
      } finally {
        this.setState({ formDisabled: false });
      }
    });
  }

  renderForm() {
    return (
      <PasswordResetForm
        disabled={this.state.formDisabled}
        email={this.state.model.email}
        errors={this.state.errors}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        submitDisabled={this.state.submitDisabled}
        topLevelError={this.state.topLevelError}
      />
    );
  }

  renderAlreadySentMessage() {
    return (
      <Fragment>
        <CardSpacer />
        <CardTextLine text={'Password reset email has been sent to:'} />
        <CardTextLine bold text={this.props.passwordResetEmailSentTo || 'fakeemail@gmail.com'} />
        <CardSpacer />
        <CardTextLine text={'Follow the link in this email to reset your password.'} />
      </Fragment>
    );
  }

  render() {
    const { passwordResetEmailSentTo } = this.props;
    return (
      <div className={buildClasses(['detail-view', 'password-reset-view'])}>
        <CardList>
          <Card header={'Request Password Reset'} hoverable={false}>
            {!passwordResetEmailSentTo && this.renderForm()}
            {passwordResetEmailSentTo && this.renderAlreadySentMessage()}
          </Card>
        </CardList>
      </div>
    );
  }
}

export default PasswordResetPage;
