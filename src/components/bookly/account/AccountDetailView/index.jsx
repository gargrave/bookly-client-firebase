// @flow
import React from 'react';
import { func, instanceOf, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { User } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';

type Props = {
  onLogoutClick: Function,
  user: User,
};

function AccountDetailView({
  onLogoutClick,
  user,
}: Props) {
  const {
    email,
    lastLogin,
    registered,
  } = user;

  return (
    <div className={buildClasses('account-detail-view')}>
      <Card
        classes={['card--top-margin-med', 'detail-card', 'account-detail-card']}
        hoverable={false}
        title="My Account">
        <p className={buildClasses('card-text')}>
          <strong>Email:</strong> {email}
        </p>

        <hr/>
        <p className={buildClasses('card-text')}>
          <strong>Registered:</strong> {format(registered, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>
        <p className={buildClasses('card-text')}>
          <strong>Last login:</strong> {format(lastLogin, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>

        <hr/>

        <ButtonRow>
          <Button
            onClick={onLogoutClick}
            position="left"
            text="Logout"
            type="info"
          />
        </ButtonRow>
      </Card>
    </div>
  );
}

AccountDetailView.propTypes = {
  onLogoutClick: func.isRequired,
  user: shape({
    email: string.isRequired,
    lastLogin: instanceOf(Date).isRequired,
    registered: instanceOf(Date).isRequired,
  }).isRequired,
};

export default AccountDetailView;
