// @flow
import React from 'react';
import { func } from 'prop-types';

import Button from '../../../common/Button';
import Card from '../../../common/Card';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextLine from '../../../common/Card/CardTextLine';

type Props = {
  onSendLinkClick: Function,
};

const VerifyAccountNotice = ({
  onSendLinkClick,
}: Props) => {
  return (
    <Card
      classes={['detail-card', 'verify-account-card']}
      hoverable={false}
    >
      <CardTextLine
        bold={true}
        text={'Your email address has not been verified!'}
      />
      <CardTextLine
        text={'Your must verify your email address before your account will be active.'}
      />
      <CardSpacer />

      <Button
        onClick={onSendLinkClick}
        text="Resend Verification Link"
        type="warning"
      />
    </Card>
  );
};

VerifyAccountNotice.propTypes = {
  onSendLinkClick: func.isRequired,
};

export default VerifyAccountNotice;
