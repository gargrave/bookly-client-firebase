// @flow
import React, { Fragment } from 'react';
import { func, shape, string } from 'prop-types';

import type { PasswordReset, PasswordResetErrors } from '../../flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import { sendPasswordResetEmail } from '../../../../wrappers/auth';
import { passwordResetModel } from '../../../auth/models';
import { passwordResetHasAllFields, validatePasswordReset } from '../../../auth/validators';

import Card from '../../../common/components/Card/Card';
import CardSpacer from '../../../common/components/Card/CardSpacer/CardSpacer';
import CardList from '../../../common/components/CardList/CardList';
import CardTextLine from '../../../common/components/Card/CardTextLine/CardTextLine';
import PasswordResetForm from '../../components/PasswordResetForm/PasswordResetForm';

type Props = {
  actions: Object,
  passwordResetEmailSentTo: string,
  snackbarActions: Object,
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
    actions: shape({
      markPasswordResetEmailSent: func.isRequired,
    }),
    passwordResetEmailSentTo: string,
    snackbarActions: shape({
      createSnackbar: func.isRequired,
    }),
  };

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
        this.props.actions.markPasswordResetEmailSent(model.email);
      } catch (err) {
        const topLevelError = 'This was an error sending the email.';
        this.props.snackbarActions.createSnackbar(topLevelError);
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
