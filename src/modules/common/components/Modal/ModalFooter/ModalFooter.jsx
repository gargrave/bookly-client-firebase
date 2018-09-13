// @flow
import React from 'react'
import { func, string } from 'prop-types'

import Button from '../../Button/Button'
import ButtonRow from '../../ButtonRow/ButtonRow'

import styles from './ModalFooter.css'

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
    <div className={styles.modalFooter}>
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
    </div>
  )
}

ModalFooter.propTypes = {
  cancelText: string,
  confirmText: string,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
}

export default ModalFooter
