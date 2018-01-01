// @flow
import React from 'react';
import { any, bool, func, shape, string } from 'prop-types';

import type { User } from '../../../../constants/flowtypes';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

type Props = {
  disabled?: boolean,
  errors: User,
  onInputChange: Function,
  onSubmit: Function,
  topLevelError?: string,
  user: any,
  submitDisabled?: boolean,
};

function LoginForm({
  disabled = false,
  errors,
  onInputChange,
  onSubmit,
  submitDisabled,
  topLevelError,
  user,
}: Props) {
  return (
    <Form
      classes={['login-form']}
      disabled={disabled}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      topLevelError={topLevelError}
    >
      <InputField
        boundValue={user.email}
        disabled={disabled}
        error={errors.email}
        label="Email"
        name="email"
        onInputChange={onInputChange}
        type="email"
      />

      <InputField
        boundValue={user.password}
        disabled={disabled}
        error={errors.password}
        label="Password"
        name="password"
        onInputChange={onInputChange}
        type="password"
      />
    </Form>
  );
}

LoginForm.propTypes = {
  disabled: bool,
  errors: shape({
    email: string.isRequired,
    password: string.isRequired,
  }).isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  user: shape({
    email: string.isRequired,
    password: string.isRequired,
  }).isRequired,
  submitDisabled: bool,
  topLevelError: string,
  user: any,
};

export default LoginForm;
