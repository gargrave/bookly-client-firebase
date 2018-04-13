// @flow
import React from 'react';
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { User } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import {
  userBasicDetailsTextList,
  userRegDetailsTextList,
} from './helpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextList from '../../../common/Card/CardTextList';

type Props = {
  onLogoutClick: Function,
  user: User,
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
