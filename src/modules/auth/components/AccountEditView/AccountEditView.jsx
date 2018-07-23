// @flow
import React from 'react';
import { bool, func, object, string } from 'prop-types';

import type { Profile } from '../../../profiles/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import AccountForm from '../AccountForm/AccountForm';
import Card from '../../../common/components/Card/Card';

type Props = {
  disabled: boolean,
  errors: Object,
  onCancelClick: Function,
  onInputChange: Function,
  onSubmit: Function,
  profile: Profile,
  submitDisabled: boolean,
  topLevelError: string,
};

const AccountEditView = ({
  disabled,
  errors,
  onCancelClick,
  onInputChange,
  onSubmit,
  profile,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <div className={buildClasses(['detail-view', 'account-edit-view'])}>
      <Card
        classes={['detail-card', 'account-edit-card']}
        header="Update My Account"
        hoverable={false}
      >
        <AccountForm
          disabled={disabled}
          errors={errors}
          onCancel={onCancelClick}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          profile={profile}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </div>
  );
};

AccountEditView.propTypes = {
  disabled: bool.isRequired,
  errors: object.isRequired,
  onCancelClick: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  profile: object.isRequired,
  submitDisabled: bool.isRequired,
  topLevelError: string,
};

export default AccountEditView;
