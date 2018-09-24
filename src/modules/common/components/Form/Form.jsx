// @flow
import React from 'react'
import { any, array, func, bool, string } from 'prop-types'

import { buildClass } from '../../../../utils/cssHelpers'

import Alert from '../Alert/Alert'
import Button from '../Button'
import ButtonRow from '../ButtonRow/ButtonRow'

import styles from './Form.css'

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

const Form = ({
  cancelBtnText,
  children,
  classes = [],
  disabled,
  onCancel,
  onSubmit,
  submitBtnText,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <div>
      {topLevelError && <Alert message={topLevelError} type="danger" />}
      <form
        className={buildClass(styles.form, ...(classes || []))}
        onSubmit={onSubmit}
        noValidate
      >
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
    </div>
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
