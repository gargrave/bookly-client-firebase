// @flow
import React from 'react';
import { bool, func } from 'prop-types';

import Button from '../../../common/components/Button/Button';
import Card from '../../../common/components/Card/Card';
import CardSpacer from '../../../common/components/Card/CardSpacer/CardSpacer';
import CardTextList from '../../../common/components/Card/CardTextList/CardTextList';

type Props = {
  emailHasBeenSent: boolean,
  onSendLinkClick: Function,
};

const buttonText = (emailHasBeenSent) =>
  emailHasBeenSent ? 'Verification Link Has Been Sent!' : 'Resend Verification Link';

const buttonClass = (emailHasBeenSent) =>
  emailHasBeenSent ? 'info' : 'warning';

const textList = [
  { title: '', value: 'You must verify your email address before your account will be fully activated.' },
  {
    title: '',
    value: 'You should have received a verification link at your email address when you registered, ' +
      'but if you need a new link, you can request one below.',
  },
  { title: 'NOTE', value: 'After verifying your email, you MUST log out and log back in one time for the activation to take effect.' },
];

const VerifyAccountNotice = ({
  emailHasBeenSent,
  onSendLinkClick,
}: Props) => {
  return (
    <Card
      classes={['detail-card', 'verify-account-card']}
      hoverable={false}
      title={'Your email address has not been verified!'}
    >
      <CardSpacer />
      <CardTextList textList={textList} />
      <CardSpacer />

      <Button
        disabled={emailHasBeenSent}
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
