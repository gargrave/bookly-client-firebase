// @flow
import React from 'react'
import { oneOf, string } from 'prop-types'

import * as S from './CardTextLine.styles'

type Props = {
  text: string,
  type?: string,
}

const validTypes = ['subtext', 'text', 'title']

const CardTextLine = ({ text, type = 'text' }: Props) => {
  return <S.CardTextLine className={type || null}>{text}</S.CardTextLine>
}

CardTextLine.propTypes = {
  text: string.isRequired,
  type: oneOf(validTypes),
}

export default CardTextLine
