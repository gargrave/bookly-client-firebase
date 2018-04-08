// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../../../constants/flowtypes';

import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

type Props = {
  author: Author,
  disabled?: boolean,
  errors: AuthorErrors,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  topLevelError?: string,
  submitDisabled?: boolean,
};

const AuthorForm = ({
  author,
  disabled = false,
  errors,
  onCancel,
  onInputChange,
  onSubmit,
  submitDisabled,
  topLevelError,
}: Props) => {
  return (
    <Form
      classes={['author-form']}
      disabled={disabled}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      topLevelError={topLevelError}
    >
      <InputField
        boundValue={author.firstName}
        disabled={disabled}
        error={errors.firstName}
        label="First name"
        name="firstName"
        onInputChange={onInputChange}
      />

      <InputField
        boundValue={author.lastName}
        disabled={disabled}
        error={errors.lastName}
        label="Last name"
        name="lastName"
        onInputChange={onInputChange}
      />
    </Form>
  );
};

AuthorForm.propTypes = {
  author: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  disabled: bool,
  errors: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default AuthorForm;
