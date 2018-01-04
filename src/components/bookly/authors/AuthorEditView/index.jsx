// @flow
import React from 'react';
import { bool, func, object, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../../../constants/flowtypes';

import AuthorForm from '../AuthorForm';
import Card from '../../../common/Card';

type Props = {
  author: Author,
  disabled: boolean,
  errors: AuthorErrors,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  submitDisabled?: boolean,
  topLevelError?: string,
};

function AuthorEditView({
  author,
  disabled,
  errors,
  onCancel,
  onInputChange,
  onSubmit,
  submitDisabled = false,
  topLevelError,
}: Props) {
  return (
    <div className="author-edit-view">
      <Card
        classes={['card--top-margin-med']}
        header={'Update Author'}
        hoverable={false}
      >
        <AuthorForm
          author={author}
          disabled={disabled}
          errors={errors}
          onCancel={onCancel}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </div>
  );
}

AuthorEditView.propTypes = {
  author: object.isRequired,
  disabled: bool,
  errors: object.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default AuthorEditView;
