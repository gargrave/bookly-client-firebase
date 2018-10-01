// @flow
import React from 'react'
import { bool, func, instanceOf, oneOfType, shape, string } from 'prop-types'
import styled from 'react-emotion'

import type { User } from '../../flowtypes'
import type { Profile } from '../../../profiles/flowtypes'

import { userBasicDetailsTextList, userRegDetailsTextList } from './helpers'

import Button from '../../../common/components/Button'
import ButtonRow from '../../../common/components/ButtonRow/ButtonRow'
import Card from '../../../common/components/Card/Card'
import VerifyAccountNotice from '../VerifyAccountNotice/VerifyAccountNotice'

import { views } from '../../../../styles'

type Props = {
  onEditClick: Function,
  onLogoutClick: Function,
  onVerifyAccountClick: Function,
  profile: Profile,
  user: User,
  verificationEmailHasBeenSent: boolean,
}

const Styled = styled('div')`
  ${views.viewWrapper};
`

const AccountDetailView = ({
  onEditClick,
  onLogoutClick,
  onVerifyAccountClick,
  profile,
  user,
  verificationEmailHasBeenSent,
}: Props) => {
  return (
    <Styled>
      <Card>
        <Card.Header text="My Account" />
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

      {!user.emailVerified && (
        <VerifyAccountNotice
          emailHasBeenSent={verificationEmailHasBeenSent}
          onSendLinkClick={onVerifyAccountClick}
        />
      )}
    </Styled>
  )
}

AccountDetailView.propTypes = {
  onEditClick: func.isRequired,
  onLogoutClick: func.isRequired,
  onVerifyAccountClick: func.isRequired,
  user: shape({
    email: string,
    emailVerified: bool,
    lastLogin: oneOfType([instanceOf(Date), string]),
    registered: oneOfType([instanceOf(Date), string]),
  }).isRequired,
  verificationEmailHasBeenSent: bool.isRequired,
}

export default AccountDetailView
