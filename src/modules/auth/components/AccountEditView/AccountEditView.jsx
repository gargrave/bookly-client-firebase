// @flow
import React from 'react'
import { bool, func, object, string } from 'prop-types'
import styled from 'react-emotion'

import type { Profile } from '../../../profiles/flowtypes'

import AccountForm from '../AccountForm/AccountForm'
import Card from '../../../common/components/Card/Card'

import { views } from '../../../../styles'

type Props = {
  disabled: boolean,
  errors: Object,
  onCancelClick: Function,
  onInputChange: Function,
  onSubmit: Function,
  profile: Profile,
  submitDisabled: boolean,
  topLevelError: string,
}

const Styled = styled('div')`
  ${views.viewWrapper};
`

const AccountEditView = ({
  disabled,
  errors,
  onCancelClick,
  onInputChange,
  onSubmit,
  profile,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <Styled>
      <Card>
        <Card.Header text="Update My Account" />
        <AccountForm
          disabled={disabled}
          errors={errors}
          onCancel={onCancelClick}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          profile={profile}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </Styled>
  )
}

AccountEditView.propTypes = {
  disabled: bool.isRequired,
  errors: object.isRequired,
  onCancelClick: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  profile: object.isRequired,
  submitDisabled: bool.isRequired,
  topLevelError: string,
}

export default AccountEditView
