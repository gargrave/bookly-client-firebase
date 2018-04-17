// @flow
import React from 'react';
import { object } from 'prop-types';

import type { Profile, User } from '../../../../globals/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import profileModel from '../../../../models/Profile.model';

import Card from '../../../common/Card/Card';

import AccountForm from '../AccountForm/AccountForm';

type Props = {
  profile: Profile,
  user: User,
};

const AccountEditView = ({
  profile,
  user,
}: Props) => {
  return (
    <div className={buildClasses(['detail-view', 'account-edit-view'])}>
      <Card
        classes={['detail-card', 'account-edit-card']}
        header="Update My Account"
        hoverable={false}
      >
        <AccountForm
          disabled={false}
          errors={profileModel.emptyErrors()}
          onCancel={() => {}}
          onInputChange={() => {}}
          onSubmit={() => {}}
          profile={profile}
          submitDisabled={false}
          topLevelError={''}
        />
      </Card>
    </div>
  );
};

AccountEditView.propTypes = {
  profile: object.isRequired,
  user: object.isRequired,
};

export default AccountEditView;
