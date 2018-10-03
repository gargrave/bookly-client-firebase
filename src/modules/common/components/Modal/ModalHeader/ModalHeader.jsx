// @flow
import React from 'react'
import { string } from 'prop-types'

import * as S from './ModalHeader.styles'

type Props = {
  title?: string,
}

const ModalFooter = ({ title }: Props) => {
  return (
    <S.ModalHeader>
      <S.ModalTitle>{title || 'Confirm'}</S.ModalTitle>
    </S.ModalHeader>
  )
}

ModalFooter.propTypes = {
  title: string,
}

export default ModalFooter
