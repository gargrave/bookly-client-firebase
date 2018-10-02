// @flow
import React from 'react'
import { bool, func, object, string } from 'prop-types'
import styled from 'react-emotion'

import type { Author, AuthorErrors } from '../../flowtypes'

import { views } from '../../../../styles'

import Card from '../../../common/components/Card/Card'
import AuthorForm from '../AuthorForm/AuthorForm'

type Props = {
  author: Author,
  disabled: boolean,
  errors: AuthorErrors,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  submitDisabled?: boolean,
  topLevelError?: string,
}

const Styled = styled('div')`
  ${views.viewWrapper};
`

const AuthorEditView = ({
  author,
  disabled,
  errors,
  onCancel,
  onInputChange,
  onSubmit,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <Styled>
      <Card>
        <Card.Header text="Update Author" />
        <AuthorForm
          author={author}
          disabled={disabled}
          errors={errors}
          onCancel={onCancel}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </Styled>
  )
}

AuthorEditView.propTypes = {
  author: object.isRequired,
  disabled: bool,
  errors: object.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
}

export default AuthorEditView
