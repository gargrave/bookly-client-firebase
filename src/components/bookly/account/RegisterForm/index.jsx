// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import type { RegisterErrors, RegisterUser } from '../../../../modules/auth/flowtypes';

import Form from '../../../../modules/common/components/Form/Form';
import InputField from '../../../../modules/common/components/InputField/InputField';

type Props = {
  disabled?: boolean,
  errors: RegisterErrors,
  registerUser: RegisterUser,
  onInputChange: Function,
  onSubmit: Function,
  submitBtnText?: string,
  submitDisabled?: boolean,
  topLevelError?: string,
};

const RegisterPage = ({
  disabled = false,
  errors,
  registerUser,
  onInputChange,
  onSubmit,
  submitBtnText,
  submitDisabled,
  topLevelError,
}: Props) => (
  <Form
    classes={['register-form']}
    disabled={disabled}
    onSubmit={onSubmit}
    submitBtnText={submitBtnText}
    submitDisabled={submitDisabled}
    topLevelError={topLevelError}
  >
    <InputField
      boundValue={registerUser.email}
      disabled={disabled}
      error={errors.email}
      label="Email"
      name="email"
      onInputChange={onInputChange}
      type="email"
    />

    <InputField
      boundValue={registerUser.password}
      disabled={disabled}
      error={errors.password}
      label="Password"
      name="password"
      onInputChange={onInputChange}
      type="password"
    />

    <InputField
      boundValue={registerUser.passwordConfirm}
      disabled={disabled}
      error={errors.passwordConfirm}
      label="Confirm Password"
      name="passwordConfirm"
      onInputChange={onInputChange}
      type="password"
    />
  </Form>
);

RegisterPage.propTypes = {
  disabled: bool,
  errors: shape({
    email: string.isRequired,
    password: string.isRequired,
    passwordConfirm: string.isRequired,
  }).isRequired,
  registerUser: shape({
    email: string.isRequired,
    password: string.isRequired,
    passwordConfirm: string.isRequired,
  }).isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitBtnText: string,
  submitDisabled: bool,
  topLevelError: string,
};

export default RegisterPage;
