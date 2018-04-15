// @flow
import React from 'react';
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { User } from '../../../../globals/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import {
  userBasicDetailsTextList,
  userRegDetailsTextList,
} from './helpers';

import Button from '../../../common/Button';
import Card from '../../../common/Card';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextList from '../../../common/Card/CardTextList';
import VerifyAccountNotice from '../VerifyAccountNotice/VerifyAccountNotice';

type Props = {
  onLogoutClick: Function,
  onVerifyAccountClick: Function,
  user: User,
  verificationEmailHasBeenSent: boolean,
};

const AccountDetailView = ({
  onLogoutClick,
  onVerifyAccountClick,
  user,
  verificationEmailHasBeenSent,
}: Props) => {
  return (
    <div className={buildClasses(['detail-view', 'account-detail-view'])}>
      <Card
        classes={['detail-card', 'account-detail-card']}
        header="My Account"
        hoverable={false}
      >

        <CardSpacer />
        <CardTextList textList={userBasicDetailsTextList(user)} />
        <CardSpacer />
        <CardTextList textList={userRegDetailsTextList(user)} />
        <CardSpacer />

        <Button
          onClick={onLogoutClick}
          text="Logout"
          type="info"
        />
      </Card>
      {!user.emailVerified &&
        <VerifyAccountNotice
          emailHasBeenSent={verificationEmailHasBeenSent}
          onSendLinkClick={onVerifyAccountClick}
        />
      }
    </div>
  );
};

AccountDetailView.propTypes = {
  onLogoutClick: func.isRequired,
  onVerifyAccountClick: func.isRequired,
  user: shape({
    email: string,
    emailVerified: bool,
    lastLogin: oneOfType([
      instanceOf(Date),
      string,
    ]),
    registered: oneOfType([
      instanceOf(Date),
      string,
    ]),
  }).isRequired,
  verificationEmailHasBeenSent: bool.isRequired,
};

export default AccountDetailView;
