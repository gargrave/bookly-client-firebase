// @flow
import React from 'react'
import { any, array, func, bool, string } from 'prop-types'
import styled from 'react-emotion'

import Alert from '../Alert/Alert'
import Button from '../Button'
import ButtonRow from '../ButtonRow/ButtonRow'

type Props = {
  cancelBtnText?: string,
  children?: any,
  classes?: string[],
  disabled?: boolean,
  onCancel?: Function,
  onSubmit: Function,
  submitBtnText?: string,
  submitDisabled?: boolean,
  topLevelError?: string,
}

const StyledDiv = styled('div')`
  margin: auto;
  margin-top: 20px;
  max-width: 600px;
  text-align: left;
`

const Form = ({
  cancelBtnText,
  children,
  disabled,
  onCancel,
  onSubmit,
  submitBtnText,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <StyledDiv>
      {topLevelError && <Alert message={topLevelError} type="danger" />}
      <form onSubmit={onSubmit} noValidate>
        {children}

        <ButtonRow>
          <Button
            canSubmit={true}
            disabled={submitDisabled || disabled || false}
            onClick={onSubmit}
            position="left"
            text={submitBtnText || 'Submit'}
            type="success"
          />

          {onCancel && (
            <Button
              onClick={onCancel}
              position="right"
              text={cancelBtnText || 'Cancel'}
              type="light"
            />
          )}
        </ButtonRow>
      </form>
    </StyledDiv>
  )
}

Form.propTypes = {
  cancelBtnText: string,
  children: any,
  classes: array,
  disabled: bool,
  onCancel: func,
  onSubmit: func.isRequired,
  submitBtnText: string,
  submitDisabled: bool,
  topLevelError: string,
}

export default Form
