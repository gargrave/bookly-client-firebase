// @flow
import React from 'react';
import { bool, func, object, string } from 'prop-types';

import type { Profile } from '../../../profiles/flowtypes';

import AccountForm from '../AccountForm/AccountForm';
import Card from '../../../common/components/Card/Card';

import styles from './AccountEditView.css';

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
    <div className={styles.accountEditView}>
      <Card
        header="Update My Account">
        <AccountForm
          disabled={disabled}
          errors={errors}
          onCancel={onCancelClick}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          profile={profile}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError} />
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
