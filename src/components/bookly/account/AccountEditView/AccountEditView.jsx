// @flow
import React from 'react';
import { object } from 'prop-types';

import type { Profile, User } from '../../../../globals/flowtypes';

type Props = {
  profile: Profile,
  user: User,
};

const AccountEditView = ({
  profile,
  user,
}: Props) => {
  return (
    <div>
      <h2>AccountEditView</h2>
    </div>
  );
};

AccountEditView.propTypes = {
  profile: object.isRequired,
  user: object.isRequired,
};

export default AccountEditView;
