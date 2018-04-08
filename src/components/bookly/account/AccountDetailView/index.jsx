// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { User } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';
import CardDivider from '../../../common/Card/CardDivider';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextList from '../../../common/Card/CardTextList';

type Props = {
  onLogoutClick: Function,
  user: User,
};

const userBasicDetailsTextList = (user: User) => {
  const {
    email,
  } = user;

  return [
    { title: 'Email', value: email },
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
        hoverable={false}
        title="My Account">

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
