// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import type { Profile, ProfileErrors } from '../../../../globals/flowtypes';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

type Props = {
  disabled?: boolean,
  errors: ProfileErrors,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  profile: Profile,
  topLevelError?: string,
  submitDisabled?: boolean,
};

const profileShape = shape({
  firstName: string.isRequired,
  lastName: string.isRequired,
});

const AccountForm = ({
  disabled = false,
  errors,
  onCancel,
  onInputChange,
  onSubmit,
  profile,
  submitDisabled,
  topLevelError,
}: Props) => {
  return (
    <Form
      classes={['account-form']}
      disabled={disabled}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      topLevelError={topLevelError}
    >
      <InputField
        boundValue={profile.firstName}
        disabled={disabled}
        error={errors.firstName}
        label="First name"
        name="firstName"
        onInputChange={onInputChange}
      />

      <InputField
        boundValue={profile.lastName}
        disabled={disabled}
        error={errors.lastName}
        label="Last name"
        name="lastName"
        onInputChange={onInputChange}
      />
    </Form>
  );
};

AccountForm.propTypes = {
  profile: profileShape.isRequired,
  disabled: bool,
  errors: profileShape.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default AccountForm;
