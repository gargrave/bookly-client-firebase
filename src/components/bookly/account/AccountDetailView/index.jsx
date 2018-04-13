// @flow
import React from 'react';
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { User } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextList from '../../../common/Card/CardTextList';

type Props = {
  onLogoutClick: Function,
  user: User,
};

const userBasicDetailsTextList = (user: User) => {
  const {
    email,
    emailVerified,
  } = user;

  return [
    { title: 'Email', value: email },
    { title: 'Verified', value: `${emailVerified}` },
  ];
};

const userRegDetailsTextList = (user: User) => {
  const {
    lastLogin,
    registered,
  } = user;

  return [
    { title: 'Registered', value: format(registered, 'MMM. DD, YYYY, HH:mm:ss') },
    { title: 'Last login', value: format(lastLogin, 'MMM. DD, YYYY, HH:mm:ss') },
  ];
};

const AccountDetailView = ({
  onLogoutClick,
  user,
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
};

AccountDetailView.propTypes = {
  onLogoutClick: func.isRequired,
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
};

export default AccountDetailView;
