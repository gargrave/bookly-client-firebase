// @flow
import React from 'react';
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { User } from '../../flowtypes';
import type { Profile } from '../../../profiles/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import {
  userBasicDetailsTextList,
  userRegDetailsTextList,
} from './helpers';

import Button from '../../../common/components/Button/Button';
import ButtonRow from '../../../common/components/ButtonRow/ButtonRow';
import Card from '../../../common/components/Card/Card';
import CardSpacer from '../../../common/components/Card/CardSpacer/CardSpacer';
import CardTextList from '../../../common/components/Card/CardTextList/CardTextList';
import VerifyAccountNotice from '../VerifyAccountNotice/VerifyAccountNotice';

type Props = {
  onEditClick: Function,
  onLogoutClick: Function,
  onVerifyAccountClick: Function,
  profile: Profile,
  user: User,
  verificationEmailHasBeenSent: boolean,
};

const AccountDetailView = ({
  onEditClick,
  onLogoutClick,
  onVerifyAccountClick,
  profile,
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
        <CardTextList textList={userBasicDetailsTextList(user, profile)} />
        <CardSpacer />
        <CardTextList textList={userRegDetailsTextList(user)} />
        <CardSpacer />

        <ButtonRow>
          <Button
            onClick={onLogoutClick}
            position="left"
            text="Logout"
            type="info"
          />
          <Button
            onClick={onEditClick}
            position="right"
            text="Edit"
            type="secondary"
          />
        </ButtonRow>
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
  onEditClick: func.isRequired,
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