// @flow
import React, { Fragment } from 'react'
import { array, func, oneOfType, string } from 'prop-types'

import ModalBackdrop from './ModalBackdrop/ModalBackdrop'
import ModalBody from './ModalBody/ModalBody'
import ModalFooter from './ModalFooter/ModalFooter'
import ModalHeader from './ModalHeader/ModalHeader'

import * as S from './Modal.styles'

type Props = {
  cancelText?: string,
  confirmText?: string,
  message: string | string[],
  onCancel: Function,
  onConfirm: Function,
  title?: string,
}

const Modal = ({
  cancelText,
  confirmText,
  message,
  onCancel,
  onConfirm,
  title,
}: Props) => {
  return (
    <Fragment>
      <S.ModalWrapper>
        <ModalHeader title={title} />
        <ModalBody message={message} />
        <ModalFooter
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </S.ModalWrapper>
      <ModalBackdrop onClick={onCancel} />
    </Fragment>
  )
}

Modal.propTypes = {
  cancelText: string,
  confirmText: string,
  message: oneOfType([array, string]).isRequired,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
  title: string,
}

export default Modal
