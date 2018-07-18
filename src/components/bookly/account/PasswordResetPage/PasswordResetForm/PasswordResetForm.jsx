// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import Form from '../../../../../modules/common/components/Form/Form';
import InputField from '../../../../../modules/common/components/InputField/InputField';

type Props = {
  disabled?: boolean,
  email: string,
  errors: any,
  onInputChange: Function,
  onSubmit: Function,
  submitBtnText?: string,
  submitDisabled?: boolean,
  topLevelError?: string,
};

const PasswordResetForm = ({
  disabled = false,
  email,
  errors,
  onInputChange,
  onSubmit,
  submitBtnText,
  submitDisabled,
  topLevelError,
}: Props) => (
  <Form
    classes={['password-reset-form']}
    disabled={disabled}
    onSubmit={onSubmit}
    submitBtnText={submitBtnText}
    submitDisabled={submitDisabled}
    topLevelError={topLevelError}
  >
    <InputField
      boundValue={email}
      disabled={disabled}
      error={errors.email}
      label="Email"
      name="email"
      onInputChange={onInputChange}
      type="email"
    />
  </Form>
);

PasswordResetForm.propTypes = {
  disabled: bool,
  email: string.isRequired,
  errors: shape({
    email: string.isRequired,
  }).isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitBtnText: string,
  submitDisabled: bool,
  topLevelError: string,
};

export default PasswordResetForm;
