// @flow
import React from 'react'
import { array, oneOfType, string } from 'prop-types'

import * as S from './ModalBody.styles'

type Props = {
  message: string | string[],
}

const renderText = (message: string | string[]) => {
  if (!Array.isArray(message)) {
    message = [message]
  }

  return message.map(msg => <S.ModalBodyText key={msg}>{msg}</S.ModalBodyText>)
}

const ModalBody = ({ message }: Props) => {
  return <S.ModalBody>{renderText(message)}</S.ModalBody>
}

ModalBody.propTypes = {
  message: oneOfType([array, string]).isRequired,
}

export default ModalBody
