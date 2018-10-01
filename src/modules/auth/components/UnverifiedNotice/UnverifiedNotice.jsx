// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'

import { spacing } from '../../../../styles'
import { localUrls } from '../../../../globals/urls'

import Alert from '../../../common/components/Alert/Alert'

const StyledMessage = styled('p')`
  margin-top: ${spacing.small};
`

const StyledLink = styled(Link)`
  text-decoration: underline;
`

const UnverifiedNotice = () => {
  return (
    <div>
      <Alert
        message="You must verify your email address before proceeding."
        type="warning"
      >
        <StyledMessage>
          You can request a new verification link from your{' '}
          <StyledLink to={localUrls.account}>Account Page</StyledLink>.
        </StyledMessage>
      </Alert>
    </div>
  )
}

export default UnverifiedNotice
