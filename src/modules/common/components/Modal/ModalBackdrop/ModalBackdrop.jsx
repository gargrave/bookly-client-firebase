// @flow
import React from 'react'
import { func } from 'prop-types'

import * as S from './ModalBackdrop.styles'

type Props = {
  onClick: Function,
}

const ModalBackdrop = ({ onClick }: Props) => {
  return <S.ModalBackdrop onClick={onClick} />
}

ModalBackdrop.propTypes = {
  onClick: func,
}

export default ModalBackdrop
