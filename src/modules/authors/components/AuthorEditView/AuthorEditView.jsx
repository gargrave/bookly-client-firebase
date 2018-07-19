// @flow
import React from 'react';
import { bool, func, object, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import Card from '../../../common/components/Card/Card';
import AuthorForm from '../AuthorForm/AuthorForm';

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

const AuthorEditView = ({
  author,
  disabled,
  errors,
  onCancel,
  onInputChange,
  onSubmit,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <div className={buildClasses(['edit-view', 'author-edit-view'])}>
      <Card
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
};

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
