// @flow
import React from 'react'
import { func, string } from 'prop-types'

import Button from '../../Button'
import ButtonRow from '../../ButtonRow/ButtonRow'

import * as S from './ModalFooter.styles'

type Props = {
  cancelText?: string,
  confirmText?: string,
  onCancel: Function,
  onConfirm: Function,
}

const ModalFooter = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <S.ModalFooter>
      <ButtonRow>
        <Button
          onClick={onCancel}
          position="left"
          text={cancelText || 'Cancel'}
          type="secondary"
        />

        <Button
          onClick={onConfirm}
          position="right"
          text={confirmText || 'Confirm'}
        />
      </ButtonRow>
    </S.ModalFooter>
  )
}

ModalFooter.propTypes = {
  cancelText: string,
  confirmText: string,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
}

export default ModalFooter
