// @flow
import React from 'react';
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { User } from '../../flowtypes';
import type { Profile } from '../../../profiles/flowtypes';

import styles from './AccountDetailView.css';

import {
  userBasicDetailsTextList,
  userRegDetailsTextList,
} from './helpers';

import Button from '../../../common/components/Button/Button';
import ButtonRow from '../../../common/components/ButtonRow/ButtonRow';
import Card from '../../../common/components/Card/Card';
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
    <div className={styles.accountDetailView}>
      <Card
        classes={['detail-card', 'account-detail-card']}
        header="My Account"
        hoverable={false}
      >

        <Card.Spacer />
        <Card.TextList textList={userBasicDetailsTextList(user, profile)} />
        <Card.Spacer />
        <Card.TextList textList={userRegDetailsTextList(user)} />
        <Card.Spacer />

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
