// @flow
import React from 'react';
import { bool, func } from 'prop-types';

import Button from '../../../common/Button';
import Card from '../../../common/Card';
import CardSpacer from '../../../common/Card/CardSpacer';
import CardTextLine from '../../../common/Card/CardTextLine';

type Props = {
  emailHasBeenSent: boolean,
  onSendLinkClick: Function,
};

const buttonText = (emailHasBeenSent) =>
  emailHasBeenSent ? 'Verification Link Has Been Sent!' : 'Resend Verification Link';

const buttonClass = (emailHasBeenSent) =>
  emailHasBeenSent ? 'info' : 'warning';

const VerifyAccountNotice = ({
  emailHasBeenSent,
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
        text={buttonText(emailHasBeenSent)}
        type={buttonClass(emailHasBeenSent)}
      />
    </Card>
  );
};

VerifyAccountNotice.propTypes = {
  emailHasBeenSent: bool.isRequired,
  onSendLinkClick: func.isRequired,
};

export default VerifyAccountNotice;
